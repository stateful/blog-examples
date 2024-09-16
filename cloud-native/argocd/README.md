# Self Managed Argo CD - App of Everything

# Create Local Kubernetes Cluster

Intall kind.

```sh
brew install kind
```

Create local Kubernetes Cluster using kind

```sh
kind create cluster --name my-cluster
```

Check cluster is running and healthy

```sh
kubectl cluster-info — context kind-my-cluster
```

# Git Repository Hierarchy

Folder structure below is used in this project. You are free to change it.

```ini
argocd/
├── app-projects/          # Stores Argo CD Application Projects YAML files
├── applications/          # Stores Argo CD Application YAML files
├── installation/          # Stores Argo CD installation files
│   ├── argo-cd/        # Contains Helm chart for Argo CD
│   └── values-override.yaml        # Custom values for Argo CD installation
```

# Create App Configuration and Project Settings

edit *installation/values-override.yaml* to update your configuration.

```sh
cat << EOF > installation/values-override.yaml
server:
  configEnabled: true
  config:
    repositories: |
      - type: git
        url: https://github.com/stateful/blog-examples.git
      - name: argo-helm
        type: helm
        url: https://argoproj.github.io/argo-helm
  additionalApplications: 
    - name: argocd
      namespace: argocd
      destination:
        namespace: argocd
        server: https://kubernetes.default.svc
      project: argocd
      source:
        helm:
          version: v3
          valueFiles:
          - values.yaml
          - ../values-override.yaml
        path: installation/argo-cd
        repoURL: https://github.com/stateful/blog-examples.git
        targetRevision: HEAD
      syncPolicy:
        syncOptions:
        - CreateNamespace=true
    - name: applications
      namespace: argocd
      destination:
        namespace: argocd
        server: https://kubernetes.default.svc
      project: argocd
      source:
        path: applications
        repoURL: https://github.com/stateful/blog-examples.git
        targetRevision: HEAD
        directory:
          recurse: true
          jsonnet: {}
      syncPolicy:
        automated:
          selfHeal: true
          prune: true
    - name: app-projects
      namespace: argocd
      destination:
        namespace: argocd
        server: https://kubernetes.default.svc
      project: argocd
      source:
        path: app-projects
        repoURL: https://github.com/stateful/blog-examples.git
        targetRevision: HEAD
        directory:
          recurse: true
          jsonnet: {}
      syncPolicy:
        automated:
          selfHeal: true
          prune: true
  additionalProjects: 
  - name: argocd
    namespace: argocd
    additionalLabels: {}
    additionalAnnotations: {}
    description: Argocd Project
    sourceRepos:
    - '*'
    destinations:
    - namespace: argocd
      server: https://kubernetes.default.svc
    clusterResourceWhitelist:
    - group: '*'
      kind: '*'
    orphanedResources:
      warn: false
EOF
```

# Install Argo CD Using Helm

Install Argo CD to *argocd* namespace using argo-cd helm chart overriding default values with *values-override.yaml* file. If argocd namespace does not exist, use *--create-namespace* parameter to create it.

```sh {"cwd":"/Users/macbookpro/Desktop/blog-examples/Cloud-native/Agrocd/argocd-install/"}
cd installation/
helm install argocd ./argo-cd \
    --namespace=argocd \
    --create-namespace \
    -f values-override.yaml
```

Wait until all pods are running.

```sh
kubectl -n argocd get pods
```

Get initial admin password.

```sh
kubectl -n argocd get secrets argocd-initial-admin-secret \
    -o jsonpath='{.data.password}' | base64 -d
```

Forward argocd-server service port 80 to localhost:8080 using kubectl.

```sh {"background":"true"}
kubectl -n argocd port-forward service/argocd-server 8080:80
```

Browse http://localhost:8080 and login with initial admin password.

```sh
open https://localhost:8080
```

# Demo With Sample Application

Create an application project definition file called *sample-project*.

```sh
cat << EOF > app-projects/sample-project.yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: sample-projects
  namespace: argocd
spec:
  clusterResourceWhitelist:
  - group: '*'
    kind: '*'
  destinations:
  - namespace: sample-app
    server: https://kubernetes.default.svc
  orphanedResources:
    warn: false
  sourceRepos:
  - '*'
EOF
```

Create a sample application definition yaml file called *sample-app* under application.

```sh
cat << EOF >> application/sample-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sample-app
  namespace: argocd
spec:
  destination:
    namespace: sample-app
    server: https://kubernetes.default.svc
  project: sample-project
  source:
    path: sample-app/
    repoURL: https://github.com/stateful/blog-examples.git
    targetRevision: HEAD
  syncPolicy:
    syncOptions:
    - CreateNamespace=true
    automated:
      selfHeal: true
      prune: true
EOF
```

Push changes to your repository

# Cleanup

Remove application and application project definition files in the git repository `sample-app.yaml` and `sample-project.yaml`

Uninstall argo-cd helm deployment.

```sh
helm uninstall argocd
```

Wait until all resources are deleted in argocd namespace.

```sh
kubectl -n argocd get pods
```

Delete argocd namespaces.

```sh
kubectl delete ns argocd
```

Delete kind cluster.

```sh
kind delete cluster --name my-cluster
```

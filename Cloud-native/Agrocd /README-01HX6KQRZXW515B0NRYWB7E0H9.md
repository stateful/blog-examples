---
runme:
  document:
    relativePath: README.md
  session:
    id: 01HX6KQRZXW515B0NRYWB7E0H9
    updated: 2024-05-06 14:34:01+01:00
---

# Self Managed Argo CD - App of Everything

# Create Local Kubernetes Cluster

Intall kind.

```sh
brew install kind
```

Create local Kubernetes Cluster using kind

```sh
kind create cluster — name my-cluster
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
│   ├── helm-chart/        # Contains Helm chart for Argo CD
│   └── values.yaml        # Custom values for Argo CD installation
```

# Create App Configuration and Project Settings

edit *argocd-install/values-override.yaml* to update your configuration.

```sh
cat << EOF > argocd-install/values-override.yaml
server:
  configEnabled: true
  config:
    repositories: |
      - type: git
        url: ht*****************************************it
      - name: argo-helm
        type: helm
        url: ht********************************lm
  additionalApplications: 
    - name: argocd
      namespace: argocd
      destination:
        namespace: argocd
        server: ht**************************vc
      project: argocd
      source:
        helm:
          version: v3
          valueFiles:
          - values.yaml
          - ../values-override.yaml
        path: argocd-install/argo-cd
        repoURL: ht*****************************************it
        targetRevision: HEAD
      syncPolicy:
        syncOptions:
        - CreateNamespace=true
    - name: argocd-apps
      namespace: argocd
      destination:
        namespace: argocd
        server: ht**************************vc
      project: argocd
      source:
        path: argocd-apps
        repoURL: ht*****************************************it
        targetRevision: HEAD
        directory:
          recurse: true
          jsonnet: {}
      syncPolicy:
        automated:
          selfHeal: true
          prune: true
    - name: argocd-appprojects
      namespace: argocd
      destination:
        namespace: argocd
        server: ht**************************vc
      project: argocd
      source:
        path: argocd-appprojects
        repoURL: ht*****************************************it
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
      server: ht**************************vc
    clusterResourceWhitelist:
    - group: '*'
      kind: '*'
    orphanedResources:
      warn: false
EOF

# Ran on 2024-05-06 14:27:08+01:00 for 602ms exited with 0
```

# Install Argo CD Using Helm

Install Argo CD to *argocd* namespace using argo-cd helm chart overriding default values with *values-override.yaml* file. If argocd namespace does not exist, use *--create-namespace* parameter to create it.

```sh {"cwd":"/Users/macbookpro/Desktop/blog-examples/Cloud-native/Agrocd/argocd-install/"}
cd argocd-install/
helm install argocd ./argo-cd \
    --namespace=argocd \
    --create-namespace \
    -f values-override.yaml

# Ran on 2024-05-06 14:27:33+01:00 for 3.84s exited with 0
ma**************go:192: info: skipping unknown hook: "crd-install"
ma**************go:192: info: skipping unknown hook: "crd-install"
NAME: argocd
LAST DEPLOYED: Mon May  6 14:27:35 2024
NAMESPACE: argocd
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
In order to access the server UI you have the following options:

1. kubectl port-forward service/argocd-server -n argocd 8080:443

    and then open the browser on ht*****************80 and accept the certificate

2. enable ingress in the values file `server.ingress.enabled` and either
      - Add the annotation for ssl passthrough: ht****************************************************************************************************gh
      - Add the `--insecure` flag to `server.extraArgs` in the values file and terminate SSL at your ingress: ht***********************************************************************************************************************ts


After reaching the UI the first time you can login with username: admin and the password **** be the
name of the server pod. You can get the pod name by running:

kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2

```

Wait until all pods are running.

```sh
kubectl -n argocd get pods

# Ran on 2024-05-06 14:34:00+01:00 for 374ms exited with 0
NAME                                             READY   STATUS              RESTARTS   AGE
ar**************************r-57************mt   0/1     ContainerCreating   0          6m24s
ar*************************9-zqxtg               0/1     Init:0/1            0          6m24s
ar*************************g8                    1/1     Running             0          6m24s
ar*************************5-g4x79               0/1     ContainerCreating   0          6m24s
ar**************************cn                   0/1     ContainerCreating   0          6m24s
```

Get initial admin password.

```sh
kubectl -n argocd get secrets argocd-initial-admin-secret \
    -o jsonpath='{.data.password}' | ba**64 -d

# Ran on 2024-05-06 13:37:59+01:00 for 656ms exited with 0
rFffqHiGZpCbPSyQ
```

Forward argocd-server service port 80 to lo*****st:8080 using kubectl.

```sh {"background":"true"}
kubectl -n argocd port-forward service/argocd-server 8080:80

Forwarding from 12*****.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
Handling connection for 8080
error: lost connection to pod
 *  Program exited with code 1.
```

Browse ht*****************80 and login with initial admin password.

```sh
open ht******************80

# Ran on 2024-05-06 13:50:54+01:00 for 667ms exited with 0
```

# Demo With Sample Application

Create an application project definition file called *sample-project*.

```sh
cat << EOF > argocd-appprojects/sample-project.yaml
apiVersion: ar*******io/v1****a1
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
    server: ht**************************vc
  orphanedResources:
    warn: false
  sourceRepos:
  - '*'
EOF

# Ran on 2024-05-06 13:47:53+01:00 for 581ms exited with 0
```

Push changes to your repository.

```sh
git add .
git commit -m "Create sample-project"
git push
```

Create a sample application definition yaml file called *sample-app* under argocd-apps.

```sh
cat << EOF >> argocd-apps/sample-app.yaml
apiVersion: ar*******io/v1****a1
kind: Application
metadata:
  name: sample-app
  namespace: argocd
spec:
  destination:
    namespace: sample-app
    server: ht**************************vc
  project: sample-project
  source:
    path: sample-app/
    repoURL: ht*****************************************it
    targetRevision: HEAD
  syncPolicy:
    syncOptions:
    - CreateNamespace=true
    automated:
      selfHeal: true
      prune: true
EOF

# Ran on 2024-05-06 14:18:02+01:00 for 665ms exited with 0
```

Push changes to your repository.

```sh
git add argocd-appprojects/sample-project.yaml
git commit -m "Create application"
git push
```

# Cleanup

Remove application and application project.

```sh
rm -f argocd-apps/sample-app.yaml
rm -f argocd-appprojects/sample-project.yaml
git rm argocd-apps/sample-app.yaml
git rm argocd-appprojects/sample-project.yaml
git commit -m "Remove app and project."
git push
```

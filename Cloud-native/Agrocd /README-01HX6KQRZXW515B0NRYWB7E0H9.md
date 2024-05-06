---
runme:
  document:
    relativePath: README.md
  session:
    id: 01HX6KQRZXW515B0NRYWB7E0H9
    updated: 2024-05-06 13:50:01+01:00
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
```

# Install Argo CD Using Helm

Install Argo CD to *argocd* namespace using argo-cd helm chart overriding default values with *values-override.yaml* file. If argocd namespace does not exist, use *--create-namespace* parameter to create it.

```sh {"cwd":"/Users/macbookpro/Desktop/blog-examples/Cloud-native/Agrocd/argocd-install/"}
cd argocd-install/
helm install argocd ./argo-cd \
    --namespace=argocd \
    --create-namespace \
    -f values-override.yaml
```

Wait until all pods are running.

```sh
kubectl -n argocd get pods

# Ran on 2024-05-06 13:37:27+01:00 for 932ms exited with 0
NAME                                             READY   STATUS    RESTARTS      AGE
ar**************************r-57************f7   1/1     Running   1 (14m ago)   6d2h
ar*************************9-hxgs8               1/1     Running   1 (14m ago)   6d2h
ar*************************5t                    1/1     Running   1 (14m ago)   6d2h
ar*************************5-xngg5               1/1     Running   1 (14m ago)   6d2h
ar**************************lt                   1/1     Running   1 (14m ago)   6d2h
```

Get initial admin password.

```sh
kubectl -n argocd get secrets argocd-initial-admin-secret \
    -o jsonpath='{.data.password}' | ba**64 -d

# Ran on 2024-05-06 13:37:59+01:00 for 656ms exited with 0
rFffqHiGZpCbPSyQ
```

Forward argocd-server service port 80 to lo*****st:8080 using kubectl.

```sh
kubectl -n argocd port-forward service/argocd-server 8080:80
```

Browse ht*****************80 and login with initial admin password.

```sh
open ht******************80
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

# Ran on 2024-05-06 13:49:14+01:00 for 2.645s exited with 0
[T-agrocd ee***67] Create sample-project
 2 files changed, 267 insertions(+), 6 deletions(-)
 create mode 100644 Cloud-native/Agrocd /RE***E-01*************************md
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 1.25 KiB | 1.25 MiB/s, done.
Total 6 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (3/3), completed with 2 local objects.
remote: 
remote: GitHub found 47 vulnerabilities on stateful/blog-examples's default branch (5 critical, 8 high, 33 moderate, 1 low). To find out more, visit:
remote:      ht*********************************************************ot
remote: 
To ht*****************************************it
   a6************67  T-agrocd -> T-****cd
```

Create a sample applicaiton definition yaml file called *sample-app* under argocd-apps.

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

# Ran on 2024-05-06 13:49:47+01:00 for 351ms exited with 0
```

Push changes to your repository.

```sh
git add .
git commit -m "Create application"
git push
```

# Cleanup

Remove application and applicaiton project.

```sh
rm -f argocd-apps/sample-app.yaml
rm -f argocd-appprojects/sample-project.yaml
git rm argocd-apps/sample-app.yaml
git rm argocd-appprojects/sample-project.yaml
git commit -m "Remove app and project."
git push
```

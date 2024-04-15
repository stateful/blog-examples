# Prerequiste

- Have a running Kubernetes Cluster

```sh
brew install kind 
```

- Have Docker running

```sh
brew install docker 
```

- Install Helm

```sh
brew install helm
```

# Basic Commands

```sh
helm search hub wordpress
```

```sh
helm list --all
```

```sh
helm repo update
```

```sh
helm history ingress-nginx
```

## Helm Repo

```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

```sh
 helm repo list
```

```sh
helm search repo
```

```sh
helm repo update
```

## Helm Install

```sh
helm install ingress-nginx ingress-nginx/ingress-nginx
```

```sh
helm status ingress-nginx
```

## Helm Uninstall 

```sh
helm uninstall ingress-nginx
```

## Helm Upgrade

```sh
helm upgrade ingress-nginx ingress-nginx/ingress-nginx --values values.yaml
```

```sh
helm status ingress-nginx
```

## Helm Rollback

```sh
helm history ingress-nginx
```

```sh
helm rollback ingress-nginx 1
```

```sh
helm status ingress-nginx
```

## Helm Get

```sh
helm get manifest ingress-nginx
```

```sh
helm get notes ingress-nginx
```

## Helm Plugin

```sh
helm plugin list
```

```sh
helm plugin install https://github.com/jkroepke/helm-secrets --version v4.6.0
```

```sh
helm diff upgrade ingress-nginx
```

```sh
helm plugin install https://github.com/databus23/helm-diff
```

```sh
kubectl apply -f sops-secrets.yaml
```
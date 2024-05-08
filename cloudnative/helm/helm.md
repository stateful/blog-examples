# Prerequiste

- Have a running Kubernetes Cluster

```sh {"background":"true"}
brew install kind
```

- Have Docker running

```sh {"background":"true"}
brew install docker
```

- Install Helm

```sh {"background":"true"}
brew install helm
```

# Basic Commands

```sh {"background":"true"}
helm search hub wordpress
```

```sh {"background":"true"}
helm list --all
```

```sh {"background":"true"}
helm repo update
```

```sh {"background":"true"}
helm history ingress-nginx
```

## Helm Repo

```sh {"background":"true"}
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

```sh {"background":"true"}
 helm repo list
```

```sh {"background":"true"}
helm search repo
```

```sh {"background":"true"}
helm repo update
```

## Helm Install

```sh {"background":"true"}
helm install ingress-nginx ingress-nginx/ingress-nginx
```

```sh {"background":"true"}
helm status ingress-nginx 
```

## Helm Uninstall

```sh {"background":"true"}
helm uninstall ingress-nginx
```

## Helm Upgrade

```sh {"background":"true"}
helm upgrade ingress-nginx ingress-nginx/ingress-nginx --values values.yaml
```

```sh {"background":"true"}
helm status ingress-nginx
```

## Helm Rollback

```sh {"background":"true"}
helm history ingress-nginx
```

```sh {"background":"true"}
helm rollback ingress-nginx 1
```

```sh {"background":"true"}
helm status ingress-nginx
```

## Helm Get

```sh {"background":"true"}
helm get manifest ingress-nginx
```

```sh {"background":"true"}
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

### Remove Helm

```sh
helm repo remove ingress-nginx
```
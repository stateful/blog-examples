---
runme:
  id: 01HXS3WAMNBDXPT0FNTK0AB706
  version: v3
---

# Prerequiste

- Have a running Kubernetes Cluster

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNRQQXPRQA"}
brew install kind
```

- Have Docker running

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNRVJW6H7Y"}
brew install docker
```

- Install Helm

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNRYQTN46B"}
brew install helm
```

## Create a Cluster

This code cell below deletes the cluster if it already existed.

```sh {"id":"01HXSACN40W8XR1WJAD9DMGXQN"}
kind delete cluster --name helm-runme-v1
```

We're using kind to create a Kubernetes cluster locally. The name of the Kubernetes cluster is `helm-runme-v1`

```sh {"id":"01HXS5N9GGJGYMAVBWB8APZNMV"}
kind create cluster --name helm-runme-v1
```

```sh {"id":"01HXSAGKB73GC3TRZWMREJMS9H"}
kubectl get ns
```

# Basic Commands

```sh {"background":"false","id":"01HXS3WAMNBDXPT0FNS2KFPQ8Z"}
helm search hub wordpress
```

Check if the repositories have been added locally

```sh {"id":"01HXSAM2XPANAQC0ZK8V0SKK9X"}
helm repo list
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNS530QFST"}
helm repo update
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNS7SKX4VX"}
helm history ingress-nginx
```

## Helm Repo

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNS9JVG3K9"}
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSCF7VJ2G"}
 helm repo list
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSF8M3TPT"}
helm search repo
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSGVJGWVN"}
helm repo update
```

## Helm Install

```sh {"id":"01HXSB3CPVN26NCFEME4PAW8E5"}
helm install runme-nginx bitnami/nginx --create-namespace nginx

```

```sh {"id":"01HXSASJNVN25T82QTNDN1MEJ5"}
kubectl get pods -n nginx
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSN11DN5E"}
helm status ingress-nginx 
```

## Helm Uninstall

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSRZFG2AP"}
helm uninstall ingress-nginx
```

## Helm Upgrade

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSWS0YGEQ"}
helm upgrade ingress-nginx ingress-nginx/ingress-nginx --values values.yaml
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNSYCQ476E"}
helm status ingress-nginx
```

## Helm Rollback

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNT17BG73M"}
helm history ingress-nginx
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNT1MZNXDJ"}
helm rollback ingress-nginx 1
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNT5JYS56D"}
helm status ingress-nginx
```

## Helm Get

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNT6T0AZ5R"}
helm get manifest ingress-nginx
```

```sh {"background":"true","id":"01HXS3WAMNBDXPT0FNT73C0VHF"}
helm get notes ingress-nginx
```

## Helm Plugin

```sh {"id":"01HXS3WAMNBDXPT0FNTAF05DYF"}
helm plugin list
```

```sh {"id":"01HXS3WAMNBDXPT0FNTBQ0XWYV"}
helm plugin install https://github.com/jkroepke/helm-secrets --version v4.6.0
```

```sh {"id":"01HXS3WAMNBDXPT0FNTE4HHCEN"}
helm diff upgrade ingress-nginx
```

```sh {"id":"01HXS3WAMNBDXPT0FNTFBRQ4CX"}
helm plugin install https://github.com/databus23/helm-diff
```

```sh {"id":"01HXS3WAMNBDXPT0FNTHEB0VQC"}
kubectl apply -f sops-secrets.yaml
```

### Remove Helm

```sh {"id":"01HXS3WAMNBDXPT0FNTJMCYKK5"}
helm repo remove ingress-nginx
```

```sh {"id":"01HXS98JV5SVG6QJ9VY24K2PCG"}
kind delete cluster --name helm-runme-v1
```

```sh {"id":"01HXS9XY4GXGMNVP44ZFQWMZ0C"}

```
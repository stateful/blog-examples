## How To Use Runme and Sealed Secret

## Prerequiste

* [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/): A running kubernetes cluster.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/): the kubernetes command-line tool is installed on your machine.
* [Kubeseal](https://archive.eksworkshop.com/beginner/200_secrets/installing-sealed-secrets/): Install the Sealed Secrets Controller

```sh {"name":"Prerequiste"}
brew install kind
brew install kubectl 
brew install kubeseal
```

## Encrypt a Secret:

Create a Kubernetes Secret as you normally would, and then use kubeseal to encrypt it. For example:

```sh {"name":"Encrypt-generic-secret"}
kubectl create secret generic mysecret --from-literal=username=myuser --from-literal=password=mypassword --dry-run=client -o yaml | kubeseal > mysealedsecret.yaml
```

Or you can encrypt manifest file containing `mysecret.yaml` your secret

```sh {"name":"Encrypt-secret-file"}
kubeseal < mysecret.yaml > mysealedsecret.yaml
```

Or you can use the sealed-secrets-controller installed in your cluster to enecypt secret before deploying

```sh {"name":"encrypt-controller "}
cat mysecret.yaml | kubeseal --controller-namespace kube-system --controller-name sealed-secrets-controller --format yaml > mysealedsecret.yaml
```

This will create a SealedSecret resource (`mysealedsecret.yaml`) containing the encrypted data.

## Adding a new value to a sealed secret

Update your manifest file with the updated value

```sh {"name":"update-secret"}
kubeseal --controller-namespace=kube-system --controller-name=sealed-secrets-controller < new_secret.yaml > mysealedsecret.yaml
```

```sh {"name":"deploy-secret"}
kubectl apply -f mysealedsecret.yaml
```

### Decrypt Your Secrets

```sh {"name":"decrypt-sealedsecret-controller"}
kubeseal --controller-name=sealed-secrets-controller --controller-namespace=kube-system  < mysealedsecret.yaml > mysecrets.yaml
```

```sh {"name":"decrypt-cluster "}
kubectl get secret runme -o yaml > test.yaml
```

## Delete Sealed Secret

To delete the secret, use the `kubectl` command to delete the resource

```sh {"name":"delete-sealed-secrets"}
kubectl delete -f mysealedsecret.yaml
```

## Deploy the Sealed Secret:

```sh {"name":"deploy-secrets"}
kubectl apply -f mysealedsecret.yaml
```

The Sealed Secrets controller will decrypt the SealedSecret and create a regular Kubernetes Secret with the decrypted data.
## How To Use Runme and Sealed Secret

## Prerequiste

[Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/): A running kubernetes cluster.

```sh {"id":"01HRY7NR4YZQXE2M1FMT40PFXJ"}
brew install kind
```

[Kubectl](https://kubernetes.io/docs/tasks/tools/): the kubernetes command-line tool is installed on your machine.

```sh {"id":"01HRY7NCVYDT9K7Y0A000ZC669"}
brew install kubectl 
```

[Kubeseal](https://archive.eksworkshop.com/beginner/200_secrets/installing-sealed-secrets/): Install the Sealed Secrets Controller

```sh {"id":"01HRY7MEXZGDD9PHPZBQC3NMP1"}
brew install kubeseal
```

Use prerequiste notebooks to install [Prerequiste](../sealed-secret/prerequiste.md) 

## Encrypt a Secret:

Create a Kubernetes Secret as you normally would, and then use kubeseal to encrypt it. For example:

```sh {"id":"01HRPP7C7J2N6GM2N0B6YMXNWP"}
kubectl create secret generic mysecret --from-literal=username=myuser --from-literal=password=mypassword --dry-run=client -o yaml | kubeseal > mysealedsecret.yaml
```

Or you can encrypt manifest file containing `mysecret.yaml` your secret

```sh {"id":"01HRPQ7C5Y054XKGYT71E40EGH"}
kubeseal < mysecret.yaml > mysealedsecret.yaml
```

Or you can use the sealed-secrets-controller installed in your cluster to enecypt secret before deploying

```sh {"id":"01HRPRSEZHB0X6CHZGSRQD80ZM"}
cat mysecret.yaml | kubeseal --controller-namespace kube-system --controller-name sealed-secrets-controller --format yaml > mysealedsecret.yaml 
```

This will create a SealedSecret resource (`mysealedsecret.yaml`) containing the encrypted data.

## Adding a new value to a sealed secret

```sh {"id":"01HRQ0NF7FTBQM6GTQH56FVZNX"}
echo -n "my secret api key" | kubectl create secret generic xxx --dry-run=client --from-file=api_key=/dev/stdin -o json | kubeseal --controller-namespace=kube-system --controller-name=sealed-secrets --format yaml --merge-into sealed-secret.yaml
```

## Delete Sealed Secret

To delete the secret, use the `kubectl` command to delete the resource

```sh {"id":"01HRPV1PYZQ9NG133FHDP745SW"}
kubectl delete -f mysealedsecret.yaml
```

## Deploy the Sealed Secret:

```sh {"id":"01HRPP9K1N8RE9DWGMG4R8HHGV"}
kubectl apply -f mysealedsecret.yaml
```

The Sealed Secrets controller will decrypt the SealedSecret and create a regular Kubernetes Secret with the decrypted data.
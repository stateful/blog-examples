## **Prerequiste**

For This guide we are using the linux OS 

### **Kubernetes Cluster**

Have a running [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/):

For AMD64 OS

```sh {"id":"01HRY17WFT15AG25Y5F1ZA25CN","name":"K8s-cluster-AMD64"}
export version

# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-amd64
# Make the kind binary executable
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

For ARM64 OS

```sh {"id":"01HRY170V8MKE512368XGW5MB8","name":"K8s-cluster-ARM64"}
export version

# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-arm64
# Make the kind binary executable
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

### **Kubectl**

Install [Kubectl](https://kubernetes.io/docs/tasks/tools/); the kubernetes command-line tool you need to interact with your kubernetes cluster.

```sh {"id":"01HRY0PMN04N20XC765736GZ9F","name":"Kubectl"}
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
echo "$(cat kubectl.sha256)  kubectl" | shasum -a 256 --check
# Make the kubectl binary executable
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl
# Check the version you installed is up-to-date
kubectl version --client
# Remove the checksum file
rm kubectl.sha256
```

### **Kubeseal**

[Kubeseal](https://archive.eksworkshop.com/beginner/200_secrets/installing-sealed-secrets/): Install the Sealed Secrets command tool.

```sh {"id":"01HRY0HW5FKNC8D4VFAM4N1MG2","name":"Kubeseal"}
export version

wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v$version/kubeseal-$version-linux-amd64.tar.gz
tar xfz kubeseal-$version-linux-amd64.tar.gz
sudo install -m 755 kubeseal /usr/local/bin/kubeseal

```

Installing the Custom Controller and CRD for SealedSecrets

```sh {"id":"01HRYBEM3ADHTS4WVHD65HRKEG","name":"CRD-SealedSecrets"}
export version

wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v$version/controller.yaml
kubectl apply -f controller.yaml
# Check the status of the controller pod.
kubectl get pods -n kube-system | grep sealed-secrets-controller

```

## **Encrypt a Secret**:

Create a Kubernetes Secret as you normally would, and then use kubeseal to encrypt it. For example:

```sh {"id":"01HRPP7C7J2N6GM2N0B6YMXNWP","name":"Encrypt-generic-secret"}
kubectl create secret generic mysecret --from-literal=username=myuser --from-literal=password=mypassword --dry-run=client -o yaml | kubeseal > mysealedsecret.yaml
```

Or you can encrypt manifest file containing `mysecret.yaml` your secret

```sh {"id":"01HRPQ7C5Y054XKGYT71E40EGH","name":"Encrypt-secret-file"}
kubeseal < mysecret.yaml > mysealedsecret.yaml
```

Or you can use the sealed-secrets-controller installed in your cluster to enecypt secret before deploying

```sh {"id":"01HRPRSEZHB0X6CHZGSRQD80ZM","name":"Encrypt-Sealed-secrets-controller"}
cat mysecret.yaml | kubeseal --controller-namespace kube-system --controller-name sealed-secrets-controller --format yaml > mysealedsecret.yaml 
```

This will create a SealedSecret resource (`mysealedsecret.yaml`) containing the encrypted data.

## **Adding a new value to a sealed secret**

```sh {"id":"01HRQ0NF7FTBQM6GTQH56FVZNX","name":"Update-secrets"}
echo -n "my secret api key" | kubectl create secret generic xxx --dry-run=client --from-file=api_key=/dev/stdin -o json | kubeseal --controller-namespace=kube-system --controller-name=sealed-secrets-controller --format yaml --merge-into mysealedsecret.yaml
```

## **Delete Sealed Secret**

To delete the secret, use the `kubectl` command to delete the resource

```sh {"id":"01HRPV1PYZQ9NG133FHDP745SW","name":"delete-sealed-secrets"}
kubectl delete -f mysealedsecret.yaml
```

## **Deploy the Sealed Secret**:

```sh {"id":"01HRPP9K1N8RE9DWGMG4R8HHGV","name":"deploy-secrets"}
kubectl apply -f mysealedsecret.yaml
```

The Sealed Secrets controller will decrypt the SealedSecret and create a regular Kubernetes Secret with the decrypted data.
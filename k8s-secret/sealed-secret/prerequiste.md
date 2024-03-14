## Prerequiste

For This guide we are using the linux OS or Mac OS ( with we are using homebrew)

### **Kubernetes Cluster**

Have a running [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/):

```sh {"id":"01HRY17WFT15AG25Y5F1ZA25CN"}
export version

# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-amd64
```

```sh {"id":"01HRY170V8MKE512368XGW5MB8"}
export version

# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-arm64
```

Make the kind binary executable

```sh {"id":"01HRY18EHGE6K9T3Z3H0KGDD55"}
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

#### For Mac Os

Install brew

```sh {"id":"01HRY2BP1XQQFCWEZEVG3Y5NRD"}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install kind

```sh {"id":"01HRY29VSM3JFRXJBAD7QG0H8R"}
brew install kind
```

## **Kubectl**

Install [Kubectl](https://kubernetes.io/docs/tasks/tools/); the kubernetes command-line tool you need to interact with your kubernetes cluster.

```sh {"id":"01HRY0PMN04N20XC765736GZ9F"}
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
echo "$(cat kubectl.sha256)  kubectl" | shasum -a 256 --check
```

Make the kubectl binary executable

```sh {"id":"01HRY1A8Y6XESXVB8R4N2F6CTG"}
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl
```

Check the version you installed is up-to-date:

```sh {"id":"01HRY1AM7JRJDWSGKTEB7H87D7"}
kubectl version --client
```

```sh {"id":"01HRY1ATYFF4AHKZB3W141N6CS"}
rm kubectl.sha256
```

### For Mac

```sh {"id":"01HRY2FMKTV5B6B8B1FQF7WQQ7"}
brew install kubectl
```

## **Kubeseal**

[Kubeseal](https://archive.eksworkshop.com/beginner/200_secrets/installing-sealed-secrets/): Install the Sealed Secrets command tool.

```sh {"id":"01HRY0HW5FKNC8D4VFAM4N1MG2"}
export version

wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v$version/kubeseal-$version-linux-amd64.tar.gz
tar xfz kubeseal-$version-linux-amd64.tar.gz
sudo install -m 755 kubeseal /usr/local/bin/kubeseal

```

Installing the Custom Controller and CRD for SealedSecrets

```sh {"id":"01HRYBEM3ADHTS4WVHD65HRKEG"}
export version

wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v$version/controller.yaml
kubectl apply -f controller.yaml

```

Check the status of the controller pod.

```sh {"id":"01HRYBG3140X12Z0X1ZY7VFXDX"}
kubectl get pods -n kube-system | grep sealed-secrets-controller

```
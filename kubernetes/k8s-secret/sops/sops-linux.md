---
runme:
  id: 01HSDK6B83AW56WBX7ZZKSEBVF
  version: v3
---

## **Prerequiste**

For This guide we are using the linux OS

### **Kubernetes Cluster**

Have a running [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/):

```sh {"id":"01HRY17WFT15AG25Y5F1ZA25CN","name":"kind-AMD64"}
export version

# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-amd64

# Make the kind binary executable
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

```sh {"id":"01HRY170V8MKE512368XGW5MB8","name":"kind-ARM64"}
export version

# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-arm64

# Make the kind binary executable
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

## **Kubectl**

Install [Kubectl](https://kubernetes.io/docs/tasks/tools/); the kubernetes command-line tool you need to interact with your kubernetes cluster.

```sh {"id":"01HRY0PMN04N20XC765736GZ9F","name":"Kubectl"}
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
echo "$(cat kubectl.sha256)  kubectl" | shasum -a 256 --check

# Make the kubectl binary executable
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl

# Check the version
kubectl version --client

# Remove the  checksum file
rm kubectl.sha256
```

## **SOPS**

Download and install SOPS Binary

```sh {"id":"01HRY2T0NAT6SED45Q4P8E0MCZ","name":"SOPS"}
export version

curl -LO https://github.com/getsops/sops/releases/download/v$version/sops-v$version.linux.amd64

# Move the binary to your PATH
mv sops-v$version.linux.amd64 /usr/local/bin/sops
# Make the binary executable
chmod +x /usr/local/bin/sops

```

## **CLoud Provider**

Install and configure your [AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-install.html)

```sh {"id":"01HRYESS7X8TK9J2F43JG6TAEE","name":"AWS"}
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws configure
```

## Configure SOPS

Configure SOPS with your key and preferred settings. In this example, we are using AWS KMS, learn how to create a [KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)

- Set your environment variable, using `export` feature
- Create your `sops.yaml` file

```sh {"id":"01HRPM35EMN7V408S5SDM9EYYB","name":"Configure-sops"}
export region
export accountid
export alias

echo "creation_rules:
  - kms: arn:aws:kms:${region}:${accountid}:alias/${alias}" > ~/.sops1.yaml

# Verify the configuration 
cat ~/.sops1.yaml
```

## Encrypt Your Secrets

Encrypt your secrets using SOPS with AWS KMS.

- Set your variable
- Run your command:

```sh {"id":"01HRPH2EZKWS5XEB602NGEH6D2","name":"encrypt-secrets"}
export keyid
export region
export accountid
export alias

sops --encrypt --kms arn:aws:kms:${region}:${accountid}:key/${keyid} --encryption-context Role:runme-test --encrypted-regex password runme-secrets.yaml > runme-secrets-enc.yaml
```

## Decrypt Your Secrets

Retrieve and decrypt your secrets when needed.

Here is how to check for you secret within the cluster:

```sh {"id":"01HRPH01R31A3305NE6ZZ4NN3R","name":"decrypt-secrets"}
kubectl get secret runme -n test  -o jsonpath="{.data.password}" | base64 --decode
```

Here is how to decrypt your sops secret:

```sh {"id":"01HRPGWZWFZD34EPD6AGBGEBWB","name":"decrypt-sops-secrets"}
sops --decrypt --kms arn:aws:kms:${region}:${accountid}:key/${keyid} --encryption-context Role:runme-test --encrypted-regex password runme-secrets-enc.yaml > runme-secrets.yaml
```

Ensure to replace placeholders such as {region}, {account-id}, and {alias} with your actual AWS region, account ID, and alias. Customize the encryption and decryption commands based on your specific use case.

# Apply Encrypted secret

```sh {"id":"01HRPNF4Z5ZHDZ6XEH8XC70TQN","name":"apply-secret"}
sops -d runme-secrets-enc.yaml | kubectl apply -f -
```

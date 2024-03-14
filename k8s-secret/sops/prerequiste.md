## **Prerequiste**

For This guide we are using the linux OS

### **Kubernetes Cluster**

Have a running [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/):

```sh {"id":"01HRY17WFT15AG25Y5F1ZA25CN"}
# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-amd64
```

```sh {"id":"01HRY170V8MKE512368XGW5MB8"}
# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-arm64
```

Make the kind binary executable

```sh {"id":"01HRY18EHGE6K9T3Z3H0KGDD55"}
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
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

Remove the  checksum file

```sh {"id":"01HRY1ATYFF4AHKZB3W141N6CS"}
rm kubectl.sha256
```

## **SOPS**

Step 1: Download SOPS Binary

```sh {"id":"01HRY2T0NAT6SED45Q4P8E0MCZ"}
curl -LO https://github.com/getsops/sops/releases/download/v3.8.1/sops-v3.8.1.linux.amd64

```

Step 2: Move the Binary to Your PATH

```sh {"id":"01HRY2TNA7V8FX7YYTHFNW8NCK"}
# Move the binary to your PATH
mv sops-v3.8.1.linux.amd64 /usr/local/bin/sops
```

Step 3: Make the Binary Executable

```sh {"id":"01HRY2TW9SA79J9JT51XFHGDJ0"}
# Make the binary executable
chmod +x /usr/local/bin/sops
```

## **CLoud Provider**

Install and configure your [AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-install.html)

```sh {"id":"01HRYESS7X8TK9J2F43JG6TAEE"}
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Configure AWS CLI 

```sh {"id":"01HRY7FFX057R29R3S3CX7H1NM"}
aws configure
```

 An AWS account with privileges to create an [IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) and a [KMS Key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html).

```sh {"id":"01HRYGXF70DXYQQBKEV6GGGCQN"}
 aws iam create-user --user-name runme-test
```

Replace `runme-test` with the `username` you want 

## Create a KMS Key

To create a KMS key with a specific name, you can use the `--description` and the name of the key `runme-key`

```sh {"id":"01HRY626B9MMMYDTCTK7ZT3NPF"}
aws kms create-key --description "runme-key"
```

Create an alias 

```sh {"id":"01HRY636ZDM0231C0HBH4QAYVA"}
# This will create an alias "alias/MyAliasName" associated with the newly created key
aws kms create-alias --alias-name alias/runme --target-key-id {key}
```

If you have a specific policy you want to use to create a your kms key 

```sh {"id":"01HRYHTYT9E3Z0PMGDNKZ7SJP1"}
aws kms put-key-policy --key-id <key-id> --policy-name default --policy file://key-policy.json
```

`key-policy.json` is the file that contains your policy  
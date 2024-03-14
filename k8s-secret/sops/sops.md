## How To Use Runme and SOPS Secret

### Prerequisites:

[Brew](https://brew.sh/): Install package manager 

```sh {"id":"01HRY4D7CPBMBAR5ME8JMR98SD"}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

[Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/): Ensure you have a running Kubernetes cluster. For this guide, we will be using kind for my Kubernetes cluster.

```sh {"id":"01HRY3P663XP7CVE2ZTVYSGCPS"}
brew install kind
```

[Kubectl](https://kubernetes.io/docs/tasks/tools/): Install the Kubernetes command-line tool on your machine.

```sh {"id":"01HRY3MRX9NMBBZK0G49KSW0N5"}
brew install kubectl
```

[SOPS](https://fluxcd.io/flux/guides/mozilla-sops/): Install the sops 

```sh {"id":"01HRY4BH0861GRW82FBHYMSPN3"}
brew install sops
```

Cloud Provider: for this guide I will be using AWS  

- An AWS account with privileges to create an [IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) and a [KMS Key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html).

- [AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-install.html) installed and configured

```sh {"id":"01HRYEJD4W15NHJ9T3NBF9XNCF"}
brew install awscli

```

Verify installation

```sh {"id":"01HRYEJMSEADJJ5KJFAESTV44F"}
aws --version
```

Configuring the AWS CLI

```sh {"id":"01HRYEM3V2TWMG57G5X8B2FV0F"}
aws configure 
```

### Create a KMS Key

To create a KMS key with a specific name, you can use the `--description` and the name of the key `runme-key`

```sh {"id":"01HRY626B9MMMYDTCTK7ZT3NPF"}
aws kms create-key --description "runme-key"
```

Create an alias 

```sh {"id":"01HRY636ZDM0231C0HBH4QAYVA"}
# This will create an alias "alias/MyAliasName" associated with the newly created key
aws kms create-alias --alias-name alias/runme --target-key-id {key}
```

Use install [Prerequiste](../sealed-secret/prerequiste.md) notebook for linux OS 

## Configure SOPS

Configure SOPS with your key and preferred settings. In this example, we are using AWS KMS, learn how to create a [KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)

```sh {"id":"01HRPM35EMN7V408S5SDM9EYYB"}
echo "creation_rules
  - kms: arn:aws:kms:{region}:{account-id}:alias/{alias}" > ~/.sops.yaml
```

Verify the configuration by checking the contents of ~/.sops.yaml

```sh {"id":"01HRPKXCS6QA9EGDNH62FBZ4WE"}
cat ~/.sops.yaml
```

## Encrypt Your Secrets

Encrypt your secrets using SOPS with AWS KMS.

```sh {"id":"01HRPH2EZKWS5XEB602NGEH6D2"}
sops --encrypt --kms arn:aws:kms:us-east-1:001301279896:key/b3f4dd5b-a217-46b5-aef2-152fa66be8f4 --encryption-context Role:sops-runme-kms-role --encrypted-regex password runme-secrets.yaml > runme-secrets-enc.yaml
```

## Decrypt Your Secrets

Retrieve and decrypt your secrets when needed.

```sh {"id":"01HRPH01R31A3305NE6ZZ4NN3R"}
kubectl get secret sops-runme -n test -o jsonpath="{.data.password}” | base64 --decode
```

```sh {"id":"01HRPGWZWFZD34EPD6AGBGEBWB"}
sops --decrypt --kms arn:aws:kms:us-east-1:001301279896:key/b3f4dd5b-a217-46b5-aef2-152fa66be8f4 --encryption-context Role:sops-runme-kms-role --encrypted-regex password runme-secrets-enc.yaml > runme-secrets.yaml
```

Ensure to replace placeholders such as {region}, {account-id}, and {alias} with your actual AWS region, account ID, and alias. Customize the encryption and decryption commands based on your specific use case.

# Apply Encrypted secret

```sh {"id":"01HRPNF4Z5ZHDZ6XEH8XC70TQN"}
sops -d runme-secrets-enc.yaml | kubectl apply -f -
```

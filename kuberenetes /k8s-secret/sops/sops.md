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

```sh {"id":"01HSDQCVK7EDZ7QJ541Y0Y82GJ"}
aws kms create-key --description "runme-key" | jq -r '.KeyMetadata.KeyId'
```

Create an alias

```sh {"id":"01HRY636ZDM0231C0HBH4QAYVA"}
# This will create an alias "alias/MyAliasName" associated with the newly created key
aws kms create-key --description "runme-key" | jq -r '.KeyMetadata.KeyId' | while read -r line; do
    if [ ! -z "$keyid" ]; then
        aws kms create-alias --alias-name "alias/runme2121" --target-key-id "$keyid"
    fi
done
```

Use install [Prerequiste](../sealed-secret/prerequiste.md) notebook for linux OS

## Configure SOPS

Configure SOPS with your key and preferred settings. In this example, we are using AWS KMS, learn how to create a [KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)

Set your environment variable, using `export` feature

```sh {"id":"01HSDR5KPTKXKAC6CBT39K1MY7"}
export region
export accountid
export alias
```

Create your `sops.yaml` file 

```sh {"id":"01HRPM35EMN7V408S5SDM9EYYB"}
echo "creation_rules:
  - kms: arn:aws:kms:${region}:${accountid}:alias/${alias}" > ~/.sops.yaml
```

Verify the configuration by checking the contents of ~/.sops.yaml

```sh {"id":"01HRPKXCS6QA9EGDNH62FBZ4WE"}
cat ~/.sops.yaml
```

## Encrypt Your Secrets

Encrypt your secrets using SOPS with AWS KMS.

Set your variable:

```sh {"id":"01HSG7NB051D8BAXHF01A4QTY7"}
export keyid
export region
export accountid
export alias
```

execute your command:

```sh {"id":"01HRPH2EZKWS5XEB602NGEH6D2"}
sops --encrypt --kms arn:aws:kms:${region}:${accountid}:key/${keyid} --encryption-context Role:runme-test --encrypted-regex password runme-secrets.yaml > runme-secrets-enc.yaml
```

## Decrypt Your Secrets

Retrieve and decrypt your secrets when needed.

Here is how to check for you secret within the cluster:

```sh {"id":"01HRPH01R31A3305NE6ZZ4NN3R"}
kubectl get secret runme -n test  -o jsonpath="{.data.password}" | base64 --decode
```

Here is how to decrypt your sops secret:

```sh {"id":"01HRPGWZWFZD34EPD6AGBGEBWB"}
sops --decrypt --kms arn:aws:kms:${region}:${accountid}:key/${keyid} --encryption-context Role:runme-test --encrypted-regex password runme-secrets-enc.yaml > runme-secrets.yaml
```

Ensure to replace placeholders such as {region}, {account-id}, and {alias} with your actual AWS region, account ID, and alias. Customize the encryption and decryption commands based on your specific use case.

# Apply Encrypted secret

```sh {"id":"01HRPNF4Z5ZHDZ6XEH8XC70TQN"}
sops -d runme-secrets-enc.yaml | kubectl apply -f -
```

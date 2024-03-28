## How To Use Runme and SOPS Secret

### Prerequisites:

- [Brew](https://brew.sh/): Install package manager.
- [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/): Ensure you have a running Kubernetes cluster. For this guide, we will be using kind for my Kubernetes cluster.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/): Install the Kubernetes command-line tool on your machine.
- [SOPS](https://fluxcd.io/flux/guides/mozilla-sops/): Install the sops.
- [AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-install.html) installed.
- Verify and Configure the AWS CLI  ( An AWS account with privileges to create an [IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) and a [KMS Key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html).)

```sh {"id":"01HRY4D7CPBMBAR5ME8JMR98SD","name":"Prerequiste"}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install kind
brew install kubectl
brew install sops
brew install awscli
aws --version
aws configure 
```

### Create a KMS Key

- Create a KMS key with a specific name, you can use the `--description` and the name of the key `runme-key`.
- Create an alias

```sh {"id":"01HSDQCVK7EDZ7QJ541Y0Y82GJ","name":"aws-kms-key"}
export alias

aws kms create-key --description "key-runme" | jq -r '.KeyMetadata.KeyId'
keyid=$(aws kms create-key --description "key-runme" | jq -r '.KeyMetadata.KeyId')
aws kms create-alias --alias-name "alias/$alias" --target-key-id $keyid

```

## Configure SOPS

Configure SOPS with your key and preferred settings. In this example, we are using AWS KMS, learn how to create a [KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)

- Set your environment variable, using `export` feature
- Create your `sops.yaml` file

```sh {"id":"01HRPM35EMN7V408S5SDM9EYYB","name":"configure-sops"}
export region
export accountid
export alias

echo "creation_rules:
  - kms: arn:aws:kms:${region}:${accountid}:alias/${alias}" > ~/.sops.yaml

# Verify the configuration 
cat ~/.sops.yaml
```

```sh {"id":"01HT21BTZ3P4AX670EWNN0SJ01"}
cat ~/.sops.yaml
```

## Encrypt Your Secrets

Encrypt your secrets using SOPS with AWS KMS.

- Set your variable
- Run your command:

```sh {"id":"01HRPH2EZKWS5XEB602NGEH6D2","name":"encrypt-secrets"}
keyid=$(aws kms create-key --description "runme-key312" | jq -r '.KeyMetadata.KeyId')

sops --encrypt --kms arn:aws:kms:${region}:${accountid}:key/$keyid --encryption-context Role:runme-test --encrypted-regex password runme-secrets.yaml > runme-secrets-enc.yaml
```

## Decrypt Your Secrets

Retrieve and decrypt your secrets when needed.

Here is how to check for you secret within the cluster:

```sh {"id":"01HRPH01R31A3305NE6ZZ4NN3R","name":"decrypt-secrets"}
kubectl get secret runme -n test -o jsonpath="{.data.password}" | base64 --decode
```

Here is how to decrypt your sops secret:

```sh {"id":"01HRPGWZWFZD34EPD6AGBGEBWB","name":"decrypt-sops "}
sops --decrypt --kms arn:aws:kms:${region}:${accountid}:key/${keyid} --encryption-context Role:runme-test --encrypted-regex password runme-secrets-enc.yaml > runme-secrets.yaml
```

Ensure to replace placeholders such as {region}, {account-id}, and {alias} with your actual AWS region, account ID, and alias. Customize the encryption and decryption commands based on your specific use case.

# Apply Encrypted secret

```sh {"id":"01HRPNF4Z5ZHDZ6XEH8XC70TQN","name":"apply-encrypted-secret"}
sops -d runme-secrets-enc.yaml | kubectl apply -f -
```

---
runme:
  document:
    relativePath: sops-mac.md
  session:
    id: 01HX9ZZ7T6BJEYHTFGWY7GC4V2
    updated: 2024-05-07 18:04:09+01:00
---

## How To Use Runme and SOPS Secret

### Prerequisites:

- [Brew](ht***********sh/): Install package manager.
- [Kubernetes Cluster](ht******************************************rt/): Ensure you have a running Kubernetes cluster. For this guide, we will be using kind for my Kubernetes cluster.
- [Kubectl](ht**********************************ls/): Install the Kubernetes command-line tool on your machine.
- [SOPS](ht**************************************ps/): Install the sops.
- [AWS CLI](ht**************************************************************ml) installed.
- Verify and Configure the AWS CLI  ( An AWS account with privileges to create an [IAM User](ht**********************************************************ml) and a [KMS Key](ht******************************************************************ml).)

```sh {"background":"true","name":"Prerequiste"}
/bin/bash -c "$(curl -fsSL ht**************************************************************sh)"
```

```sh {"background":"true","name":"brew install kind"}
brew install kind

# Ran on 2024-05-07 18:01:18+01:00 for 2.092s exited with 1
==> Downloading https://formulae.brew.sh/api/formula.jws.json
##O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                  
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2                                                                                                                                                         4                                                                                                                                                 9#                                                                                                                                         13                                                                                                                                  18                                                                                                                              20                                                                                                                            22                                                                                                                        24#                                                                                                                 29#                                                                                                           33                                                                                                      36                                                                                                  38                                                                                            42#                                                                                     47#                                                                                 49#                                                                           53#                                                                     57                                                              61                                                          64#                                                   68#                                               71                                        75                                  79                            84#                     88#               92        96    98 100.0%
Warning: Failed to set filetime 1715100780 on 
Warning: '/Users/macbookpro/Library/Caches/Homebrew/api/cask.jws.json': No 
Warning: such file or directory
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3#                                                                                                                                                      6#                                                                                                                                                  8#                                                                                                                                                9#                                                                                                                                         13                                                                                                                                19                                                                                                                          23#                                                                                                             31                                                                                              41#                                                                             52                                                                  59#                                                     67                                        75                            84#                   89      97## 100.0%
Warning: Failed to set filetime 1715100780 on 
Warning: '/Users/macbookpro/Library/Caches/Homebrew/api/cask.jws.json': No 
Warning: such file or directory
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3                                                                                                                                                       5#                                                                                                                                                9#                                                                                                                                             11#                                                                                                                                       15                                                                                                                              20                                                                                                                          23#                                                                                                           33                                                                                            42#                                                                             52                                                              61#                                               71                                81                            84            93 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3#                                                                                                                                                      6#                                                                                                                                                9#                                                                                                                                             11#                                                                                                                                         13#                                                                                                                                     16                                                                                                                                  18                                                                                                                              20                                                                                                                          23#                                                                                                                     26#                                                                                                                   27#                                                                                                                 29#                                                                                                             31#                                                                                                         34                                                                                                      36                                                                                                  38                                                                                              41                                                                                            42#                                                                                       45#                                                                                   48#                                                                               50#                                                                           53#                                                                         54#                                                                     57                                                                60                                                          64                                                        66#                                                     67#                                               71#                                           74                                      77                                  79                              82#                         85#                     88#                 90            93        96## 100.0%
Warning: Failed to set filetime 1715100780 on 
Warning: '/Users/macbookpro/Library/Caches/Homebrew/api/cask.jws.json': No 
Warning: such file or directory
Error: Cannot download non-corrupt https://formulae.brew.sh/api/cask.jws.json!
 *  Program exited with code 1.
```

```sh {"background":"true","name":" kubectl"}
brew install kubectl

# Ran on 2024-05-07 18:01:20+01:00 for 2.058s exited with 1
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                                                                                                                                                                                  0#                                                                                                                                                            2                                                                                                                                                         4                                                                                                                                                     6#                                                                                                                                                9#                                                                                                                                         13                                                                                                                                19                                                                                                                          23#                                                                                                             31                                                                                            42#                                                                               50#                                                                             52                                                              61#                                                   68                                    78                            84#                 90## 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3                                                                                                                                                       5#                                                                                                                                                9#                                                                                                                                             11#                                                                                                                                         13                                                                                                                              20                                                                                                                          23#                                                                                                             31                                                                                              41#                                                                             52#                                                                           53                                                                60#                                                   68                                    78                            84#               92## 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3                                                                                                                                                       5#                                                                                                                                                  8#                                                                                                                                                9#                                                                                                                                         13                                                                                                                                19                                                                                                                          23#                                                                                                           33#                                                                                         44#                                                                           53                                                                  59                                  79 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #                                                                                                                                                              0#                                                                                                                                                            2#                                                                                                                                                          3#                                                                                                                                                      6#                                                                                                                                                9#                                                                                                                                             11#                                                                                                                                     16                                                                                                                          23                                                                                                                        24#                                                                                                           33#                                                                                         44#                                                                             52                                                                  59#                                                   68                                    78                            84#                 90 100.0%
Error: Cannot download non-corrupt https://formulae.brew.sh/api/cask.jws.json!
 *  Program exited with code 1.
```

```sh {"background":"true","name":"awscli"}
brew install awscli

# Ran on 2024-05-07 18:01:22+01:00 for 2.117s exited with 1
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #                                                                                                                                                              0#                                                                                                                                                            2#                                                                                                                                                          3                                                                                                                                                       5                                                                                                                                                   8#                                                                                                                                                9#                                                                                                                                         13                                                                                                                                19                                                                                                                          23#                                                                                                             31                                                                                                40#                                                                               50#                                                                             52                                                                  59                                      77 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3#                                                                                                                                                      6#                                                                                                                                                  8#                                                                                                                                                9#                                                                                                                                         13                                                                                                                              20                                                                                                                          23#                                                                                                             31                                                                                            42#                                                                             52                                                                  59#                                                   69                                      77#                           84                91## 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3#                                                                                                                                                      6                                                                                                                                                   8#                                                                                                                                                9#                                                                                                                                         13                                                                                                                              20                                                                                                                          23#                                                                                                             31                                                                                          43#                                                                             51#                                                                   58                                                      67#                                       76                          84#             93## 100.0%
Warning: Failed to set filetime 1715100780 on 
Warning: '/Users/macbookpro/Library/Caches/Homebrew/api/cask.jws.json': No 
Warning: such file or directory
Error: Cannot download non-corrupt https://formulae.brew.sh/api/cask.jws.json!
 *  Program exited with code 1.
```

```sh {"background":"true","name":"aws-version"}
aws --version

# Ran on 2024-05-07 18:01:25+01:00 for 918ms exited with 0
aw***li/2.15.45 Python/3.11.9 Darwin/23.4.0 source/arm64 prompt/off
 *  Program exited with code 0.
```

```sh {"background":"true","name":"aws-configure"}
aws configure 

# Ran on 2024-05-07 18:01:25+01:00 for 2.127s exited with 0
AWS Access Key ID [****************AV6Q]: 
AWS Secret Access Key [****************9GFx]: 
Default region name [us*****-1]: 
Default output format [None]: 
 *  Program exited with code 0.
```

### Installation of SOPS

```sh {"background":"true","name":"install-sops"}
brew install sops

# Ran on 2024-05-07 18:01:41+01:00 for 2.062s exited with 0
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3                                                                                                                                                       5#                                                                                                                                                  8#                                                                                                                                                9#                                                                                                                                         13#                                                                                                                                     16                                                                                                                                19                                                                                                                            22                                                                                                                          23#                                                                                                                   27#                                                                                                                 29#                                                                                                               30#                                                                                                         34                                                                                                    37                                                                                                  38                                                                                              41#                                                                                         44#                                                                                     47#                                                                                 49#                                                                             52#                                                                         54#                                                                     57                                                              61                                                          64#                                                     67#                                                 70#                                             72                                        75                                    78                              82#                         85#                     88#                 90          95      97 100.0%
Warning: sops 3.8.1 is already installed and up-to-date.
To reinstall 3.8.1, run:
  brew reinstall sops
 *  Program exited with code 0.
```

### Create a KMS Key

- Create a KMS key with a specific name, you can use the `--description` and the name of the key `runme-key`.
- Create an alias

```sh {"background":"false","name":"aws-kms-key","promptEnv":"yes"}
export alias 

aws kms create-key --description "key-runme" | jq -r '.KeyMetadata.KeyId'
keyid=$(aws kms create-key --description "key-runme" | jq -r '.KeyMetadata.KeyId')
aws kms create-alias --alias-name "alias/$alias" --target-key-id $keyid


# Ran on 2024-05-07 18:01:45+01:00 for 25.103s exited with 0
6a********************************31
```

## Configure SOPS

Configure SOPS with your key and preferred settings. In this example, we are using AWS KMS, learn how to create a [KMS key](ht******************************************************************ml)

- Set your environment variable, using `export` feature
- Create your `sops.yaml` file

```sh {"name":"configure-sops","promptEnv":"yes"}
export region
export accountid
export alias

echo "creation_rules:
  - kms: arn:aws:kms:${region}:${accountid}:alias/${alias}" > ~/.sops.yaml

# Verify the configuration 
cat ~/.sops.yaml

# Ran on 2024-05-07 18:02:20+01:00 for 1m 22.417s exited with 0
creation_rules:
  - kms: arn:aws:kms:us*****-1:65********65:alias/st*********me
```

```sh
code ~/.sops.yaml

# Ran on 2024-05-07 18:03:42+01:00 for 651ms exited with 0
```

```sh
cat ~/.sops.yaml

# Ran on 2024-05-07 18:03:43+01:00 for 5.518s exited with 0
creation_rules:
  - kms: arn:aws:kms:us*****-1:65********65:alias/st*********me
```

## Encrypt Your Secrets

Encrypt your secrets using SOPS with AWS KMS.

- Set your variable
- Run your command:

```sh {"name":"encrypt-secrets"}
keyid=$(aws kms create-key --description "ru********12" | jq -r '.KeyMetadata.KeyId')

sops --encrypt --kms arn:aws:kms:${region}:${accountid}:key/$keyid --encryption-context Role:runme-test --encrypted-regex password ru**************ml > runme-secrets-enc.yaml

# Ran on 2024-05-07 18:03:59+01:00 for 5.51s exited with 0
```

## Decrypt Your Secrets

Retrieve and decrypt your secrets when needed.

Here is how to check for you secret within the cluster:

```sh {"name":"decrypt-secrets"}
kubectl get secret runme -n test -o jsonpath="{.data.password}" | ba**64 --decode

# Ran on 2024-05-07 18:04:08+01:00 for 632ms exited with 1
Error from server (NotFound): namespaces "test" not found
```

Here is how to decrypt your sops secret:

```sh {"name":"decrypt-sops "}
sops --decrypt --kms arn:aws:kms:${region}:${accountid}:key/${keyid} --encryption-context Role:runme-test --encrypted-regex password ru******************ml > runme-secrets.yaml
```

Ensure to replace placeholders such as {region}, {account-id}, and {alias} with your actual AWS region, account ID, and alias. Customize the encryption and decryption commands based on your specific use case.

# Apply Encrypted secret

```sh {"name":"apply-encrypted-secret"}
sops -d runme-secrets-enc.yaml | kubectl apply -f -
```

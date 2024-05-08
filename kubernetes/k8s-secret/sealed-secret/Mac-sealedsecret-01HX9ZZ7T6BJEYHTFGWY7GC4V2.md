---
runme:
  document:
    relativePath: Mac-sealedsecret.md
  session:
    id: 01HX9ZZ7T6BJEYHTFGWY7GC4V2
    updated: 2024-05-07 18:35:28+01:00
---

## How To Use Runme and Sealed Secret

## Prerequiste

* [Kubernetes Cluster](ht******************************************rt/): A running kubernetes cluster.
* [Kubectl](ht**********************************ls/): the kubernetes command-line tool is installed on your machine.
* [Kubeseal](ht**************************************************************************ts/): Install the Sealed Secrets Controller

```sh {"name":"Prerequiste"}
brew install kind
brew install kubectl 
brew install kubeseal

# Ran on 2024-05-07 18:35:03+01:00 for 24.021s exited with 0
==> Downloading https://formulae.brew.sh/api/formula.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                -#O=-#     #      #                                                                                                                                             -=O#-  #     #       #                                                                                                                                          -=O=#    #      #        #                                                                                                                                      -=O=- #     #       #        #                                                                                                                                                                                                                                                                                                 0#                                                                                                                                                              0                                                                                                                                                             1#                                                                                                                                                            2                                                                                                                                                           3#                                                                                                                                                        4#                                                                                                                                                      6                                                                                                                                              10                                                                                                                                            12#                                                                                                                                           12#                                                                                                                                         13                                                                                                                                        14                                                                                                                                      15                                                                                                                                      16                                                                                                                                    17                                                                                                                                  18                                                                                                                                19                                                                                                                              20#                                                                                                                           22#                                                                                                                         23#                                                                                                                       25                                                                                                                      26                                                                                                                    27#                                                                                                                   27                                                                                                                  28                                                                                                                29#                                                                                                               30                                                                                                            32                                                                                                        35#                                                                                                       35                                                                                                      36#                                                                                                   38                                                                                                  38#                                                                                                 39#                                                                                               40#                                                                                             42#                                                                                           43                                                                                          43#                                                                                         44#                                                                                       45#                                                                                     46                                                                                    48                                                                                  48#                                                                                 49#                                                                               50                                                                              51#                                                                             52                                                                            52                                                                      56#                                                                     57                                                                    58                                                                  59#                                                                 59#                                                               61                                                              61#                                                             62                                                            62#                                                           64#                                                         64                                                        65#                                                       66#                                                     67                                                    68#                                                   69#                                                 69                                                71                                              72#                                             72                                            73                                          74#                                         75#                                       76                                      77                                    78#                                   79#                                 80                                81                              82#                             83                            83                          84#                         85                        86                      87#                     88#                   89                  90                91#               92              92            93#           94#         95        96      97#     98    99 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
O=#    #                                                                                                                                                      #=#=- #     #                                                                                                                                                   #=O#-   #      #                                                                                                                                                #                                                                                                                                                            2#                                                                                                                                                          3                                                                                                                                                       5                                                                                                                                                   8#                                                                                                                                                9#                                                                                                                                         13                                                                                                                                19                                                                                                                        24#                                                                                                           33                                                                                        45#                                                                             51#                                                                           53                                                          64#                                           74#                             83                        86#           94## 100.0%
Warning: kind 0.22.0 is already installed and up-to-date.
To reinstall 0.22.0, run:
  brew reinstall kind
Warning: kubernetes-cli 1.30.0 is already installed and up-to-date.
To reinstall 1.30.0, run:
  brew reinstall kubernetes-cli
Warning: kubeseal 0.26.2 is already installed and up-to-date.
To reinstall 0.26.2, run:
  brew reinstall kubeseal

```

## Encrypt a Secret:

Create a Kubernetes Secret as you normally would, and then use kubeseal to encrypt it. For example:

```sh {"name":"Encrypt-generic-secret"}
kubectl create secret generic mysecret --from-literal=username=myuser --from-literal=password=my******rd --dry-run=client -o yaml | kubeseal > mysealedsecret.yaml

# Ran on 2024-05-07 18:35:08+01:00 for 1.135s exited with 1
error: cannot get sealed secret service: services "sealed-secrets-controller" not found.
Please, use the flag --controller-name and --controller-namespace to set up the name and namespace of the sealed secrets co******er
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
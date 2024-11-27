---
runme:
  id: 01J14AGDBE2ATB52Z4V0B8JYCA
  version: v3
---

# Generating the Data Encryption Config and Key

## The Encryption Key
Generate an encryption key:

```sh {"id":"01J14AHT6FEDJP4BJ1CPF7AMC7"}
export ENCRYPTION_KEY=$(head -c 32 /dev/urandom | base64)
```

## The Encryption Config File
Create the `encryption-config.yaml` encryption config file:

```sh {"id":"01J14AJYP74SV8A6KSV47X5RYV"}
envsubst < configs/encryption-config.yaml \
  > encryption-config.yaml
```

Copy the `encryption-config.yaml` encryption config file to each controller instance:

```sh {"id":"01J14AKPGEDCY5MZWBHX3RZEPJ"}
scp encryption-config.yaml root@server:~/
```
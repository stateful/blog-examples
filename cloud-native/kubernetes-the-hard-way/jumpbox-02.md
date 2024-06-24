---
runme:
  id: 01J148M05K4CKCD3RXQQ4MA8C5
  version: v3
---

## Jumpbox

```sh {"id":"01HZEKF9STXM7WRABS5G4MZG6S"}
ssh -i “runme-hard-way.pem” admin@ec2-3-82-10-247.compute-1.amazonaws.com
```

```sh {"id":"01HZEKFKXD3KEFTZ48B2RDJP3G"}
sudo su - root
```

```sh {"id":"01HZEKGWA6AZRGXYSM6ANQ06AN"}
sudo apt-get -y install wget curl vim openssl git
```

## Sync GitHub Repository

```sh {"id":"01HZEKN250JWSKS0DXDG2KFN28"}
git clone --depth 1 \
  https://github.com/kelseyhightower/kubernetes-the-hard-way.git
```

```sh {"id":"01HZEKN5AP8PJ8Q9A2MHM70XGJ"}
cd kubernetes-the-hard-way
```

## Download Binaries

Change the directory to `/kubernetes-the-hard-way`

```sh {"id":"01HZEKPA6D374SVAH23DR4VMK3"}
mkdir downloads
```

```sh {"id":"01HZEKPP9NKNB6SVF37SZ65BXQ"}
cat downloads.txt
```

```sh {"id":"01HZEKPXGPS08S1CHK9GKDPP29"}
wget -q --show-progress \
  --https-only \
  --timestamping \
  -P downloads \
  -i downloads.txt
```

```sh {"id":"01HZEKQ6Y0J34S3M3KBPMHXEDS"}
ls -loh downloads
```

## Install kubectl

```sh {"id":"01HZEKQKKMV3ZNVFC4CPNCKZQS"}
 chmod +x downloads/kubectl
  cp downloads/kubectl /usr/local/bin/
```

```sh {"id":"01HZEKRX17AYHGB840772BY5BJ"}
kubectl version --client
```
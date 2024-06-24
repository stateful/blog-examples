---
runme:
  id: 01J14AR8WTZMZ21JTQ701K2J34
  version: v3
---

## Prerequisites
Copy etcd binaries and systemd unit files to the `server` instance:

```sh {"id":"01J14ASKQA51GV2C8JTK37RQ19"}
scp \
  downloads/etcd-v3.4.27-linux-arm64.tar.gz \
  units/etcd.service \
  root@server:~/
```

The commands in this lab must be run on the server machine. Login to the server machine using the ssh command. Example:

```sh {"id":"01J14ATT500TYTG4YGVPGMTCMF"}
ssh root@server
```

## Bootstrapping an etcd Cluster

Install the etcd Binaries
Extract and install the etcd server and the etcdctl command line utility:

```sh {"id":"01J14AX5Y1D6AEZ84YQXCZ2PR9"}
tar -xvf etcd-v3.4.27-linux-arm64.tar.gz
mv etcd-v3.4.27-linux-arm64/etcd* /usr/local/bin/
```

Configure the etcd Server

```sh {"id":"01J14AYCK48ZBKX6WGPGB7CD9F"}
mkdir -p /etc/etcd /var/lib/etcd
chmod 700 /var/lib/etcd
cp ca.crt kube-api-server.key kube-api-server.crt \
  /etc/etcd/
```

Each etcd member must have a unique name within an etcd cluster. Set the etcd name to match the hostname of the current compute instance:

Create the `etcd.service` systemd unit file:

```sh {"id":"01J14B3QN3PYHBSKAF0J29EDD7"}
mv etcd.service /etc/systemd/system/
```

Start the etcd Server

```sh {"id":"01J14B41JP1N4G7G9JM3GJB7GS"}
  systemctl daemon-reload
  systemctl enable etcd
  systemctl start etcd
```

### Verification
List the etcd cluster members:

```sh {"id":"01J14B5B9GAMPETD188TWCF1FT"}
etcdctl member list
```
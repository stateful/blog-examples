---
runme:
  id: 01J148YN54NC5BE8SW1EFBGQ0S
  version: v3
---

## Generate SSH Keys

Generate a new SSH key:

```sh {"id":"01J1492G9SAQ83SPTBA25PTNRR"}
ssh-keygen
```

```sh {"id":"01J14931FTXJ0GT4FCMMPHWV6A"}
cat id_rsa.pub 
```

ssh into remote servers

```sh {"id":"01HZEMEYZWXZGC3CDDES36ER3W"}
su - root

sed -i \
  's/^#PermitRootLogin.*/PermitRootLogin yes/' \
  /etc/ssh/sshd_config

  
```

```sh {"id":"01HZEMG5JZM55TQ7P4G9C6XDX8"}
systemctl restart sshd
```

update authorized_keys with jumpbox public key

```sh {"id":"01HZENJZ9AYQB217KAJKJF1PZS"}
 vim ~/.ssh/authorized_keys
```

## Distribute SSH Keys

ssh into every remote service and upload the public key

```sh {"id":"01HZEN2VD7CZW4CA3M1T6THVYJ"}
while read IP FQDN HOST SUBNET; do 
  ssh-copy-id root@${IP}
done < machines.txt
```

```sh {"id":"01HZEN35NNA8699XS6DBY1DHKP"}
while read IP FQDN HOST SUBNET; do 
  ssh -n root@${IP} uname -o -m
done < machines.txt
```

## Hostnames

```sh {"id":"01HZEN4F86FNY5B2TZ825TY1H2"}
while read IP FQDN HOST SUBNET; do 
    CMD="sed -i 's/^127.0.1.1.*/127.0.1.1\t${FQDN} ${HOST}/' /etc/hosts"
    ssh -n root@${IP} "$CMD"
    ssh -n root@${IP} hostnamectl hostname ${HOST}
done < machines.txt
```

```sh {"id":"01HZEN4PNZ3EXHFPSGN9MT05JE"}
while read IP FQDN HOST SUBNET; do
  ssh -n root@${IP} hostname --fqdn
done < machines.txt
```

## DNS

```sh {"id":"01HZEN5H7QXZ9XCA9QMHDQFV5J"}
echo "" > hosts
echo "# Kubernetes The Hard Way" >> hosts
```

Generate a DNS entry for each machine in the machines.txt file and append it to the hosts file:

```sh {"id":"01HZEN6EXD1T55SBB4AQSCWQF8"}
while read IP FQDN HOST SUBNET; do 
    ENTRY="${IP} ${FQDN} ${HOST}"
    echo $ENTRY >> hosts
done < machines.txt
```

Review the DNS entries in the hosts file:

```sh {"id":"01HZEN6YQZQ0H4BNJ2YRG7HT34"}
cat hosts
```

## Adding DNS Entries To A Local Machine

Append the DNS entries from hosts to /etc/hosts:

```sh {"id":"01HZEN7W3Q59CA8NCXK8DV9PM7"}
cat hosts >> /etc/hosts
```

At this point you should be able to SSH to each machine listed in the machines.txt file using a hostname.

```sh {"id":"01HZEN98WWWXR41GAQ6KHRSJ3T"}
for host in server node-0 node-1
   do ssh root@${host} uname -o -m -n
done
```

## Adding DNS Entries To The Remote Machines

Copy the hosts file to each machine and append the contents to /etc/hosts:

```sh {"id":"01HZENATDNP6GTYSCJTBH5M37P"}
while read IP FQDN HOST SUBNET; do
  scp hosts root@${HOST}:~/
  ssh -n \
    root@${HOST} "cat hosts >> /etc/hosts"
done < machines.txt
```
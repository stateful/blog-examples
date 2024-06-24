---
runme:
  id: 01J149DPSYX8YF1PCPDSK277ED
  version: v3
---

review the ca.conf configuration file

```sh {"id":"01J149DSCEGXHDY0NWDWAAHRBF"}
cat ca.conf
```

Generate the CA configuration file, certificate, and private key

```sh {"id":"01J149E1C0JAER8BZ67TC0V90W"}
  openssl genrsa -out ca.key 4096
  openssl req -x509 -new -sha512 -noenc \
    -key ca.key -days 3653 \
    -config ca.conf \
    -out ca.crt
```

## Create Client and Server Certificates

Generate the certificates

```sh {"id":"01J149H9W3XVNSG5HR2Z88QSKX"}
certs=(
  "admin" "node-0" "node-1"
  "kube-proxy" "kube-scheduler"
  "kube-controller-manager"
  "kube-api-server"
  "service-accounts"
)
```

Generate the private keys

```sh {"id":"01J149JRZARXZ6JBMPXN8DKZAH"}
for i in ${certs[*]}; do
  openssl genrsa -out "${i}.key" 4096

  openssl req -new -key "${i}.key" -sha256 \
    -config "ca.conf" -section ${i} \
    -out "${i}.csr"
  
  openssl x509 -req -days 3653 -in "${i}.csr" \
    -copy_extensions copyall \
    -sha256 -CA "ca.crt" \
    -CAkey "ca.key" \
    -CAcreateserial \
    -out "${i}.crt"
done
```

You can list the generated files with the following command:

```sh {"id":"01J149N1KPWYCYBV3Q35C4CGBX"}
ls -1 *.crt *.key *.csr
```

## Distribute the Client and Server Certificates

```sh {"id":"01J149PQPKW2HMAMKJAYYYFVVP"}
for host in node-0 node-1; do
  ssh root@$host mkdir /var/lib/kubelet/
  
  scp ca.crt root@$host:/var/lib/kubelet/
    
  scp $host.crt \
    root@$host:/var/lib/kubelet/kubelet.crt
    
  scp $host.key \
    root@$host:/var/lib/kubelet/kubelet.key
done
```

Copy the appropriate certificates and private keys to the server machine

```sh {"id":"01J149QNBVDM2122534EE7HKZR"}
scp \
  ca.key ca.crt \
  kube-api-server.key kube-api-server.crt \
  service-accounts.key service-accounts.crt \
  root@server:~/
```
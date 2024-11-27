---
runme:
  id: 01J14F78C34DTJ1A4EJQQQ1NFG
  version: v3
---

# Configuring kubectl for Remote Access

In this lab you will generate a kubeconfig file for the `kubectl` command line utility based on the `admin` user credentials.

> Run the commands in this lab from the `jumpbox` machine.

## The Admin Kubernetes Configuration File

Each kubeconfig requires a Kubernetes API Server to connect to.

You should be able to ping `server.kubernetes.local` based on the `/etc/hosts` DNS entry from a previous lap.

```bash {"id":"01J14F78C34DTJ1A4EJ5H44C5W"}
curl -k --cacert ca.crt \
  https://server.kubernetes.local:6443/version
```

```text {"id":"01J14F78C34DTJ1A4EJ96SBX0V"}
{
  "major": "1",
  "minor": "28",
  "gitVersion": "v1.28.3",
  "gitCommit": "a8a1abc25cad87333840cd7d54be2efaf31a3177",
  "gitTreeState": "clean",
  "buildDate": "2023-10-18T11:33:18Z",
  "goVersion": "go1.20.10",
  "compiler": "gc",
  "platform": "linux/arm64"
}
```

Generate a kubeconfig file suitable for authenticating as the `admin` user:

```bash {"id":"01J14F78C34DTJ1A4EJD50E1TC"}

kubectl config set-cluster kubernetes-the-hard-way \
  --certificate-authority=ca.crt \
  --embed-certs=true \
  --server=https://server.kubernetes.local:6443

kubectl config set-credentials admin \
  --client-certificate=admin.crt \
  --client-key=admin.key

kubectl config set-context kubernetes-the-hard-way \
  --cluster=kubernetes-the-hard-way \
  --user=admin

kubectl config use-context kubernetes-the-hard-way

```

The results of running the command above should create a kubeconfig file in the default location `~/.kube/config` used by the  `kubectl` commandline tool. This also means you can run the `kubectl` command without specifying a config.

## Verification

Check the version of the remote Kubernetes cluster:

```bash {"id":"01J14F78C34DTJ1A4EJEKFY08A"}
kubectl version
```

```text {"id":"01J14F78C34DTJ1A4EJH5THJT5"}
Client Version: v1.28.3
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.28.3
```

List the nodes in the remote Kubernetes cluster:

```bash {"id":"01J14F78C34DTJ1A4EJJNSR8NY"}
kubectl get nodes
```

```plaintext {"id":"01J14F78C34DTJ1A4EJNVP053V"}
NAME     STATUS   ROLES    AGE   VERSION
node-0   Ready    <none>   30m   v1.28.3
node-1   Ready    <none>   35m   v1.28.3
```

---
runme:
  id: 01J14B84FTD9VX5HPJXS726RXR
  version: v3
---

# Bootstrapping the Kubernetes Control Plane

In this lab you will bootstrap the Kubernetes control plane. The following components will be installed the controller machine: Kubernetes API Server, Scheduler, and Controller Manager.

## Prerequisites

Copy Kubernetes binaries and systemd unit files to the `server` instance:

```bash {"id":"01J14B84FTD9VX5HPJWED7AES1"}
scp \
  downloads/kube-apiserver \
  downloads/kube-controller-manager \
  downloads/kube-scheduler \
  downloads/kubectl \
  units/kube-apiserver.service \
  units/kube-controller-manager.service \
  units/kube-scheduler.service \
  configs/kube-scheduler.yaml \
  configs/kube-apiserver-to-kubelet.yaml \
  root@server:~/
```

The commands in this lab must be run on the controller instance: `server`. Login to the controller instance using the `ssh` command. Example:

```bash {"id":"01J14B84FTD9VX5HPJWGAWEPQF"}
ssh root@server
```

## Provision the Kubernetes Control Plane

Create the Kubernetes configuration directory:

```bash {"id":"01J14B84FTD9VX5HPJWJS0GSBD"}
mkdir -p /etc/kubernetes/config
```

### Install the Kubernetes Controller Binaries

Install the Kubernetes binaries:

```bash {"id":"01J14B84FTD9VX5HPJWND8Q90P"}

chmod +x kube-apiserver \
  kube-controller-manager \
  kube-scheduler kubectl
  
mv kube-apiserver \
  kube-controller-manager \
  kube-scheduler kubectl \
  /usr/local/bin/

```

### Configure the Kubernetes API Server

```bash {"id":"01J14B84FTD9VX5HPJWRB5PHKV"}

mkdir -p /var/lib/kubernetes/

mv ca.crt ca.key \
  kube-api-server.key kube-api-server.crt \
  service-accounts.key service-accounts.crt \
  encryption-config.yaml \
  /var/lib/kubernetes/

```

Create the `kube-apiserver.service` systemd unit file:

```bash {"id":"01J14B84FTD9VX5HPJWSQ88YJH"}
mv kube-apiserver.service \
  /etc/systemd/system/kube-apiserver.service
```

### Configure the Kubernetes Controller Manager

Move the `kube-controller-manager` kubeconfig into place:

```bash {"id":"01J14B84FTD9VX5HPJWTQ39PY2"}
mv kube-controller-manager.kubeconfig /var/lib/kubernetes/
```

Create the `kube-controller-manager.service` systemd unit file:

```bash {"id":"01J14B84FTD9VX5HPJWY0WJ7WW"}
mv kube-controller-manager.service /etc/systemd/system/
```

### Configure the Kubernetes Scheduler

Move the `kube-scheduler` kubeconfig into place:

```bash {"id":"01J14B84FTD9VX5HPJWY33CR0V"}
mv kube-scheduler.kubeconfig /var/lib/kubernetes/
```

Create the `kube-scheduler.yaml` configuration file:

```bash {"id":"01J14B84FTD9VX5HPJX17NBDQ6"}
mv kube-scheduler.yaml /etc/kubernetes/config/
```

Create the `kube-scheduler.service` systemd unit file:

```bash {"id":"01J14B84FTD9VX5HPJX36Y0FY7"}
mv kube-scheduler.service /etc/systemd/system/
```

### Start the Controller Services

```bash {"id":"01J14B84FTD9VX5HPJX64XKHSR"}

systemctl daemon-reload

systemctl enable kube-apiserver \
  kube-controller-manager kube-scheduler
  
systemctl start kube-apiserver \
  kube-controller-manager kube-scheduler

```

> Allow up to 10 seconds for the Kubernetes API Server to fully initialize.

### Verification

```bash {"id":"01J14B84FTD9VX5HPJXA3M535N"}
kubectl cluster-info \
  --kubeconfig admin.kubeconfig
```

```text {"id":"01J14B84FTD9VX5HPJXDWGYK5A"}
Kubernetes control plane is running at https://127.0.0.1:6443
```

## RBAC for Kubelet Authorization

In this section you will configure RBAC permissions to allow the Kubernetes API Server to access the Kubelet API on each worker node. Access to the Kubelet API is required for retrieving metrics, logs, and executing commands in pods.

> This tutorial sets the Kubelet `--authorization-mode` flag to `Webhook`. Webhook mode uses the [SubjectAccessReview](https://kubernetes.io/docs/admin/authorization/#checking-api-access) API to determine authorization.

The commands in this section will affect the entire cluster and only need to be run on the controller node.

```bash {"id":"01J14B84FTD9VX5HPJXGMCRKRA"}
ssh root@server
```

Create the `system:kube-apiserver-to-kubelet` [ClusterRole](https://kubernetes.io/docs/admin/authorization/rbac/#role-and-clusterrole) with permissions to access the Kubelet API and perform most common tasks associated with managing pods:

```bash {"id":"01J14B84FTD9VX5HPJXJ0YHASN"}
kubectl apply -f kube-apiserver-to-kubelet.yaml \
  --kubeconfig admin.kubeconfig
```

### Verification

At this point the Kubernetes control plane is up and running. Run the following commands from the `jumpbox` machine to verify it's working:

Make a HTTP request for the Kubernetes version info:

```bash {"id":"01J14B84FTD9VX5HPJXKP6D8A4"}
curl -k --cacert ca.crt https://server.kubernetes.local:6443/version
```

```text {"id":"01J14B84FTD9VX5HPJXPZ7ESD2"}
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

## **Prerequiste**

For This guide we are using the linux OS

### **Kubernetes Cluster**

Have a running [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/):

```sh {"id":"01HRY17WFT15AG25Y5F1ZA25CN"}
export version

# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-amd64

# Make the kind binary executable
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

```sh {"id":"01HRY170V8MKE512368XGW5MB8"}
export version

# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v$version/kind-linux-arm64

# Make the kind binary executable
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

## **Kubectl**

Install [Kubectl](https://kubernetes.io/docs/tasks/tools/); the kubernetes command-line tool you need to interact with your kubernetes cluster.

```sh {"id":"01HRY0PMN04N20XC765736GZ9F"}
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
echo "$(cat kubectl.sha256)  kubectl" | shasum -a 256 --check

# Make the kubectl binary executable
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl

# check version
kubectl version --client

# Remove the  checksum file
rm kubectl.sha256
```

Here are some commonly used **`kubectl`** commands related to ReplicaSets in Kubernetes:

1. **Apply a ReplicaSet manifest:**

```bash {"id":"01HSTRX6N61DZXYFGXD3PQ8A69"}
kubectl apply -f manifest.yaml
```

2. **Get information about ReplicaSets:**

```bash {"id":"01HSTRX6N69RDGVXN4NT2HMRGD"}
kubectl get replicaset
```

3. **Get detailed information about a specific ReplicaSet:**

```bash {"id":"01HSTRX6N6RV93H627E5DGA2P5"}
kubectl describe replicaset my-replicaset
```

4. **Scale up the number of replicas in a ReplicaSet:**

```bash {"id":"01HSTRX6N6GK4APV477PZVH21A"}
kubectl scale replicaset my-replicaset --replicas=4
```

5. **Scale down the number of replicas in a ReplicaSet**

```bash {"id":"01HTJCKYKFDMNYBZC5V7YV26E4"}
kubectl scale replicaset my-replicaset --replicas=2
```

6. **Delete a ReplicaSet:**

```bash {"id":"01HSTRX6N6SY08RXDMNSCFZS97"}
kubectl delete replicaset your-replicaset-name
```

7. **Delete all ReplicaSets in a namespace:**

```bash {"id":"01HSTRX6N6HGV031BDC96V1WT1"}
kubectl delete replicaset --all -n your-namespace
```

9. **View ReplicaSet events:**

```bash {"id":"01HSTRX6N6ECNT420KA5QGBCJT"}
kubectl get events --field-selector involvedObject.name=my-replicaset -n runme
```

## Manage Replicaset using a Deployment

1. **Apply a Deployment manifest:**

```bash {"id":"01HTJGQMJYDDRA1S9NBWCCAF85"}
kubectl apply -f nginx-deployment.yaml
```

2. **Update your manifest file:**

You can also scale up or down your replicaset by updating your deployment file to specific the amount of pods you want running.

`replicas: 3`

```bash {"id":"01HSTRX6N6BTJCGC8ECJZCCJSR"}
kubectl apply -f nginx-deployment.yaml
```

This will update your deployment with the define replica set

3. **Delete the pod**

A replicaSet ensure that a specific number of identical pods are running at all times, if a pod gets deleted, the ReplicaSet automatically creates a replacement pod to maintain the desired replica count.

```bash {"id":"01HTJE025MYG33CVG4AGSYX4JN"}
kubectl delete pod pod-name -n runme
```

4. **View Events**

Events are records of various occurrence and state changes in your cluster, this will show you what happened to the pod; when it got deleted and when your replica set created a new pod.

5. **Get logs from a specific pod in a ReplicaSet:**

```bash {"id":"01HSTRX6N6FMZ844J4QTEM3HC3"}
kubectl logs -f pod/my-replicaset-name -n runme
```

Remember to replace placeholders like **`your-replicaset-name`**, **`your-manifest-file.yaml`**, etc., with your actual ReplicaSet name, manifest file, or other relevant values.

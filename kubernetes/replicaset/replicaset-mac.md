# Replicaset

### Prerequisites:

- [Brew](https://brew.sh/): Install package manager
- [Docker](https://docs.docker.com/build/guide/): Install Docker
- [Kubectl](https://kubernetes.io/docs/tasks/tools/): Install the Kubernetes command-line tool on your machine.
- [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/): Ensure you have a running Kubernetes cluster. For this guide, we will be using kind for my Kubernetes cluster.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install kind
brew install kubectl
```

Here are some commonly used **`kubectl`** commands related to ReplicaSets in Kubernetes:

1. **Apply a ReplicaSet manifest:**

```bash {"name":"apply-manifest"}
kubectl apply -f manifest.yaml
```

## Get Information

2. **Get information about ReplicaSets:**

```bash {"name":"get replicaset"}
kubectl get replicaset
```

3. **Get detailed information about a specific ReplicaSet:**

```bash {"name":"describe-replicaset"}
kubectl describe replicaset my-replicaset
```

4. **Scale up the number of replicas in a ReplicaSet:**

```bash {"name":"scaleup-replicaset"}
kubectl scale replicaset my-replicaset --replicas=4
```

5. **Scale down the number of replicas in a ReplicaSet**

```bash {"name":"scaledown-replicaset"}
kubectl scale replicaset my-replicaset --replicas=2
```

6. **Delete a ReplicaSet:**

```bash
kubectl delete replicaset your-replicaset-name
```

7. **Delete all ReplicaSets in a namespace:**

```bash
kubectl delete replicaset --all -n your-namespace
```

9. **View ReplicaSet events:**

```bash
kubectl get events --field-selector involvedObject.name=my-replicaset -n runme
```

```bash
 kubectl logs -f pod/my-replicaset-c4mr5 
```

## Manage Replicaset using a Deployment

1. **Apply a Deployment manifest:**

```bash
kubectl apply -f nginx-deployment.yaml
```

2. **Update your manifest file:**

You can also scale up or down your replicaset by updating your deployment file to specific the amount of pods you want running.

`replicas: 3`

```bash
kubectl apply -f nginx-deployment.yaml
```

This will update your deployment with the define replica set

3. **Delete the pod**

A replicaSet ensure that a specific number of identical pods are running at all times, if a pod gets deleted, the ReplicaSet automatically creates a replacement pod to maintain the desired replica count.

```bash
kubectl delete pod nginx-deployment-7c79c4bf97-l24tp -n runme
```

4. **View Events**

Events are records of various occurrence and state changes in your cluster, this will show you what happened to the pod; when it got deleted and when your replica set created a new pod.

```bash
kubectl get events -n runme
```

5. **Get logs from a specific pod in a ReplicaSet:**

```bash
kubectl logs -f pod/nginx-deployment-7c79c4bf97-cslps -n runme
```

Remember to replace placeholders like **`your-replicaset-name`**, **`your-manifest-file.yaml`**, etc., with your actual ReplicaSet name, manifest file, or other relevant values.










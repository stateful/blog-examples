# Replicaset

### Prerequisites:

- [Brew](https://brew.sh/): Install package manager
- [Docker](https://docs.docker.com/build/guide/): Install Docker
- [Kubectl](https://kubernetes.io/docs/tasks/tools/): Install the Kubernetes command-line tool on your machine.
- [Kubernetes Cluster](https://kind.sigs.k8s.io/docs/user/quick-start/): Ensure you have a running Kubernetes cluster. For this guide, we will be using kind for my Kubernetes cluster.

```sh {"id":"01HRY4D7CPBMBAR5ME8JMR98SD"}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install kind
brew install kubectl
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

1. **Update your manifest file:**

You can also scale up or down your replicaset by updating your deployment file to specific the amount of pods you want running.

`replicas: 3`

```bash {"id":"01HSTRX6N6BTJCGC8ECJZCCJSR"}
kubectl apply -f nginx-deployment.yaml
```

This will update your deployment with the define replica set

2. **Delete the pod**

A replicaSet ensure that a specific number of identical pods are running at all times, if a pod gets deleted, the ReplicaSet automatically creates a replacement pod to maintain the desired replica count.

```bash {"id":"01HTJE025MYG33CVG4AGSYX4JN"}
kubectl delete pod pod-name -n runme
```

3. **View Events**

Events are records of various occurrence and state changes in your cluster, this will show you what happened to the pod; when it got deleted and when your replica set created a new pod.

4. **Get logs from a specific pod in a ReplicaSet:**

```bash {"id":"01HSTRX6N6FMZ844J4QTEM3HC3"}
kubectl logs -f pod/my-replicaset-name -n runme
```

Remember to replace placeholders like **`your-replicaset-name`**, **`your-manifest-file.yaml`**, etc., with your actual ReplicaSet name, manifest file, or other relevant values.










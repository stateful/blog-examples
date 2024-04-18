---
runme:
  id: 01HV5H4Z5Y2AAEF05KA5A4XBTP
  version: v3
---

# Docker Example

This is a basic example utilizing Docker commands to create and manage containers. The application should render a simple Docker logo to demonstrate how to build, run, inspect logs, and terminate a container effectively.

![Sample App](./html/screenshot.png "Sample App")

Build docker image

```sh {"interactive":"true","name":"build","terminalRows":"10"}
docker build -t my-golang-app .
```

Run docker image

```sh {"interactive":"false","name":"start"}
export CONTAINER_ID=$(docker run -d -p 8080:8080 my-golang-app)
echo "Starting container ${CONTAINER_ID}"
```

Open the app

```sh {"cwd":"","name":"open","terminalRows":"3"}
open http://localhost:8080
```

View container logs

```sh {"background":"true","name":"logs"}
docker logs -f $CONTAINER_ID
```

Stop container

```sh {"excludeFromRunAll":"false","interactive":"false","name":"stop"}
echo "Stopping container ${CONTAINER_ID}"
docker stop $CONTAINER_ID
```
---
runme:
  id: 01HV5H4Z5Y2AAEF05KA5A4XBTP
  version: v3
---

# Docker Example

Build docker image

```sh {"id":"01HV5H519XBQM7B9P77JJ1J365","interactive":"true","name":"docker-build","terminalRows":"10"}
docker build -t my-golang-app .
```

Run docker image

```sh {"id":"01HV5HZZBQH6X4W2K6SBRATYWB","interactive":"false","name":"docker-run"}
export CONTAINER_ID=$(docker run -d -p 8080:8080 my-golang-app)
echo "The Container ${CONTAINER_ID} has been started"
```

Open the app in the following url http://localhost:8080

Inspect container

```sh {"id":"01HV6M17AYT89D30VXJHN16RC4","name":"docker-inspect","terminalRows":"15"}
docker inspect $CONTAINER_ID | jq ".[0].State"
```

Stop container

```sh {"id":"01HV5J4EV5CAM278WDTNBHB0N4","interactive":"false","name":"docker-stop"}
echo "Stoping container ${CONTAINER_ID}"
docker stop $CONTAINER_ID

```
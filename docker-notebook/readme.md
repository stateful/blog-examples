## Prerequiste

- [Brew](https://brew.sh/): Install package manager

```sh {"name":"install-brew"}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- [Docker](https://docs.docker.com/build/guide/): Install Docker

```sh {"name":"install-docker "}
brew install docker 
```

## Basic Commands

## Docker Pull - download an image

pull image from docker hub registry

```sh
docker pull nginx
```

## docker build

```sh {"cwd":"/Users/macbookpro/Desktop/blog-examples/docker-example"}
docker build -t my-test-app .
```

## Docker Container

run - start a container

```sh
docker run nginx
```

```sh {"background":"true"}
export CONTAINER_ID=$(docker run -d -p 80:5000 nginx)
echo "Starting container ${CONTAINER_ID}"
```

open the app

```sh
open http://localhost:8000
```

```sh
docker run $CONTAINER_ID sleep 5
```

ps - list containers

```sh
docker ps
```

```sh
docker ps -a
```

STOP - stop a container

```sh
docker ps
```

```sh
docker stop $CONTAINER_ID
```

Remove a container

```sh
docker rm $CONTAINER_ID
```

```sh
docker ps -a 
```

## Docker Images

docker images

```sh
docker images
```

remove images

```sh
docker rmi nginx 
```

## Docker Exec - execute a command

```sh
docker ps -a
```

```sh
export CONTAINER_ID_TEST=$(docker ps --filter "ancestor=nginx" --format "{{.ID}}")
echo "here is your container id ${CONTAINER_ID_TEST}"
```

```sh
docker exec -it $CONTAINER_ID_TEST bash
```

### Run - attach and detach

```sh
docker run nginx
```

```sh
docker run -d nginx
```

```sh
docker attach 8fb9c
```

Container logs

```sh
docker inspect $CONTAINER_ID
```

```sh
docker logs $CONTAINER_ID
```

## Docker run

### run - tag

```sh
docker run nginx:4.0
```

### run - stdin

```sh
docker run nginx
```

```sh
docker run -i nginx
```

```sh
docker run -it nginx
```

### Run - Volume mapping

```sh
docker run -d -p 8010:8010 -v /Users/macbookpro/Desktop/composetest/nginx.conf:/etc/nginx/nginx.conf:ro nginx

```

### docker run - port mapping

```sh
docker run nginx
```

```sh
docker run -p 8080:9010 nginx
```

### Docker compose up

```sh {"background":"true"}
docker compose up
```

```sh
open http://127.0.0.1:8000/
```

```sh {"background":"true"}
docker compose down
```
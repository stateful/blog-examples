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

Pull - download an image

pull image from docker hub registry

```sh
docker pull nginx
```

## Docker Container

run - start a container

```sh
docker run nginx
```

```sh
docker run nginx sleep 5
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
docker stop beautiful_driscoll
```

Remove a container

```sh
docker rm beautiful_driscoll
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

Exec - execute a command

```sh
docker ps -a
```

```sh
docker exec composetest-redis-1 cat /etc/hosts
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
docker inspect composetest-redis-1
```

```sh
docker logs composetest-redis-1
```

## Docker run

### run - tag

```sh
docker run redis:4.0
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
docker run -d -p 80:80 -v /Users/macbookpro/Desktop/composetest/nginx.conf:/etc/nginx/nginx.conf:ro nginx

```

### docker run - port mapping

```sh
docker run nginx
```

```sh
docker run -p 80:5000 nginx
```

### Docker compose up

```sh
docker compose up
```

```sh
docker compose down
```
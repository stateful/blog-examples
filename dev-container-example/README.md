---
runme:
  id: 01HV9NZQCQQEK95Y8NNTBMA9DH
  version: v3
---

# Dev Container Example

This an example using a Dev Container with Runme, in the following steps we are going to demmostrate that you can use Runme inside a Dev Container

Requirements:

* Docker
* VS Code Extensions:
   - [Dev Containers](vscode:extension/ms-vscode-remote.remote-containers)
   - [Runme](vscode:extension/stateful.runme)

Configuration files

.vscode/settings.json

```json {"id":"01HV9YZ51H2HEXXGQPAA0Y6VNH"}
{
  "runme.server.transportType": "UDS", // Required to start runme server inside the container
}
```

Build application

```sh {"id":"01HV9P3S6T76E8TXY3WQW1CKGR","name":"build","terminalRows":"2"}
go build -v -x -o main
```

Run Application

```sh {"background":"true","id":"01HV9PRMMEPQZV40ECTKBRWWTX","name":"run"}
./main
```
# Node.js WebSocket Client: 3 Ways to Implement One

These are the example files used by the blog post [*"Node.js WebSocket Client: 3 Ways to Implement One"*](https://stateful.com/blog/nodejs-websocket-client). Check it out for more details. To run the files you need to have [Node.js](https://nodejs.org/en/) installed.

## Install Dependencies

To setup the project, first install all dependencies:

```sh { background=true }
npm install
```

## Scenario

The blog post describes how to use Web Sockets in the following scenarios:

### Creating a WebSocket Server in Node.js

To run the server, execute:

```sh
node server.js
```

You can access the endpoint of the server with your browser by running:

```sh
open http://localhost:3000
```

### Using websocket-node

To run the `websocket-node` example, run:

```sh
node websocket-node.js
```

### Using faye-websocket-node Package

To run the `faye-websocket-node` example, run:

```sh
node faye-websocket-node.js
```

### Using the sockette Package Library

To run the `sockette` example, run:

```sh
node sockette.js
```
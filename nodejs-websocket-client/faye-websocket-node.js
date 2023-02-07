const WebSocket = require('faye-websocket');

let client = new WebSocket.Client('ws://localhost:3000/');

client.on('open', function(message) {
  console.log('Connection established!');
});

client.on('message', function(message) {
  console.log("Current time on server is: '" + message.data + "'");
});

client.on('close', function(message) {
  console.log('Connection closed!', message.code, message.reason);
  
  client = null;
});
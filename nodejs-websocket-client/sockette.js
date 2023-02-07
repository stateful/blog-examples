const Sockette = require('sockette');

const client = new Sockette('ws://localhost:3000', {
  timeout: 5e3,
  maxAttempts: 10,
  onopen: message => console.log('Connection established!', message),
  onmessage: message => console.log("Current time on server is: '" + message.data + "'"),
  onreconnect: message => console.log('Reconnecting...', e),
  onmaximum: message => console.log('Connection failed!', e),
  onclose: message => console.log('Connection closed!', message.code, message.reason),
  onerror: error => console.log("Connection error: " + error.toString())
});

client.send('Tell me the time!');
client.json({type: 'ping'});
client.close(); // graceful shutdown

// Reconnect 10s later
setTimeout(ws.reconnect, 10e3);
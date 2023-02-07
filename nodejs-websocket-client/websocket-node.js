const WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('Connection established!');
    
    connection.on('error', function(error) {
        console.log("Connection error: " + error.toString());
    });
    
    connection.on('close', function() {
        console.log('Connection closed!');
    });
    
    connection.on('message', function(message) {
        console.log("Current time on server is: '" + message.utf8Data + "'");
    });
});

client.connect('ws://localhost:3000');
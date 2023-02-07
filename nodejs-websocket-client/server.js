const express = require('express');
const { Server } = require('ws');

const server = express()
  .use((req, res) => res.sendFile('/home.html', { root: __dirname }))
  .listen(3000, () => console.log(`Listening on ${3000}`));

const ws_server = new Server({ server });
ws_server.on('connection', (ws) => {
  console.log('[Server] New client connected!');
  ws.on('close', () => console.log('[Server] Client has disconnected!'));
});

setInterval(() => {
  ws_server.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
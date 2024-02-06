// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Permite todas las origenes, cambia esto según tus necesidades
    methods: ["GET", "POST"]
  }
});

let counter = 0;

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('counter', counter);

  socket.on('increment', () => {
    counter++;
    io.sockets.emit('counter', counter);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4001, () => console.log('Listening on port 4001'));
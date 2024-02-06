const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 4001;
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
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

server.listen(port, () => console.log(`Listening on port ${port}`));
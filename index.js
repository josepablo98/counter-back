const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  transports: ['polling']
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
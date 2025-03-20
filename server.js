const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    console.log('User', socket.id, 'joining room:', roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    const room = rooms.get(roomId);

    if (room.size >= 2) {
      socket.emit('room-full');
      console.log('Room', roomId, 'is full');
      return;
    }

    socket.join(roomId);
    room.add(socket.id);
    console.log('Room', roomId, 'participants:', Array.from(room));

    if (room.size === 2) {
      socket.to(roomId).emit('user-joined');
      console.log('Notifying other participant in room', roomId);
    }
  });

  socket.on('signal', ({ signal, roomId }) => {
    console.log('Relaying signal from', socket.id, 'to room', roomId);
    socket.to(roomId).emit('signal', { signal, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);
        if (participants.size === 0) {
          rooms.delete(roomId);
          console.log('Deleted empty room:', roomId);
        } else {
          socket.to(roomId).emit('peer-disconnected');
          console.log('Notified peer disconnection in room:', roomId);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

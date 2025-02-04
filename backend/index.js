const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/auth', AuthRouter);

io.on('connection', (socket) => {
    let userName = '';
    
    socket.on('user_connected', (name) => {
        userName = name;
        socket.broadcast.emit('message', { 
            message: `${name} has joined the chat`,
            sender: 'System',
            type: 'status'
        });
    });

    socket.on('message', (data) => {
        socket.broadcast.emit('message', {
            message: data.message,
            sender: data.sender
        });
    });

    socket.on('disconnect', () => {
        io.emit('message', { 
            message: `${userName} has left the chat`,
            sender: 'System',
            type: 'status'
        });
    });
});

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
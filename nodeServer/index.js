// Node Server which will handle Socket IO Connection

const io = require('socket.io')(8000)

const users = {};

io.on('connection',socket =>{
    // if new user joins, let other users know about this new user
    socket.on('new-user-joined', name =>{
        // console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    // if someone sends a message brodcast it to all other users
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
    // if someone leaves the chat show the message to all users
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
    
})
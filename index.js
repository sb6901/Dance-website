const io= require('socket.io')(8000,{
    cors: {
        origin:'*',
    }
});
const users={};
io.on('connection', socket=>{
    //If new users join let other users connected know
    socket.on('new-user-joined', name=>{
        users[socket.id]= name;
        socket.broadcast.emit('user-joined', name);
    });
    //If someone sends the message broadcast to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //If someone leaves, let others know
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

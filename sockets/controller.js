

const socketController = (socket) => {
            
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    // socket.on('enviar-mensaje', (payload) => {
    //     console.log(payload)
    // });

    socket.on('enviar-mensaje', (payload, callback) => {
        
        const id = 12345;
        callback(id);
        socket.broadcast.emit('enviar-mensaje', 'Desde el server');
    });
};



module.exports = {
    socketController
};
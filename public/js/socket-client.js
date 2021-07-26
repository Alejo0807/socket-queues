// Referencias del html

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();  


socket.on('connect', () => {
    console.log('Conectado');
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {
    console.log('Desconectado');
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});

socket.on('enviar-mensaje', () => {
    console.log( 'Buenas buenaaaas');
}); 


btnEnviar.addEventListener('click', () => {
    const mensaje = txtMessage.value;
    const payload = {
        mensaje,
        id: 'asdaID',
        fecha: new Date().getTime()
    };
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log("Desde el server", id)
    });
});



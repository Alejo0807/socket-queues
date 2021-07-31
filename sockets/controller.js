const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-state', ticketControl.last4);
    socket.emit('length-queue', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('length-queue', ticketControl.tickets.length);

    });

    socket.on('serve-ticket', ({ escritorio }, callback) => {

        if(!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.serveTicket(escritorio);

        socket.broadcast.emit('current-state', ticketControl.last4);
        socket.broadcast.emit('length-queue', ticketControl.tickets.length);
        socket.emit('length-queue', ticketControl.tickets.length);
        

        if (!ticket) {
            callback({
                ok: false,
                msg: "Ya no hay tickets por atender"
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });
};



module.exports = {
    socketController
};
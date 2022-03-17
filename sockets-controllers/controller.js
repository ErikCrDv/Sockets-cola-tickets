const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = socket => {

    socket.emit( 'latest-ticket', ticketControl.latest );
    socket.emit( 'current-status', ticketControl.last4 );
    socket.emit( 'pending-tickets', ticketControl.tickets.length );

    socket.on('next-ticket', ( payload, callback ) => {
        const next = ticketControl.nextTicket();
        callback( next );

        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );
    });

    socket.on('current-ticket', ( { desk }, callback ) => {
        if( !desk ) return callback({ msg: 'Desk is required' });

        const ticket = ticketControl.currentTicket( desk );
        socket.broadcast.emit( 'current-status', ticketControl.last4 );
        socket.emit( 'pending-tickets', ticketControl.tickets.length );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );
        if( !ticket ) return callback({ msg: 'No tickets' });

        callback( { ticket } )
    });
}

module.exports = {
    socketController
}
// HTML
const lblNewTicket = document.querySelector('#lblNewTicket'); 
const buttonNewTicket = document.querySelector('button'); 


const socket = io();

socket.on('connect', () => {
    buttonNewTicket.disabled = false;
});

socket.on('disconnect', () => {
    buttonNewTicket.disabled = true;
});

socket.on( 'latest-ticket', latest => {
    lblNewTicket.innerText = 'Ticket ' + latest;
});


buttonNewTicket.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});
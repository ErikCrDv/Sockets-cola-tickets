// HTML
const lblDesk = document.querySelector('h1'); 
const lblTicket = document.querySelector('small'); 
const btnCurrentTicket = document.querySelector('button'); 
const divAlert = document.querySelector('.alert'); 
const lblPending = document.querySelector('#lblPending'); 


const searchParams = new URLSearchParams( window.location.search );
if( !searchParams.has('desk') ){
    window.location = 'index.html';
    throw new Error(' Desk is required!s');
}

const desk = searchParams.get( 'desk' );
lblDesk.innerText = desk;
divAlert.style.display = 'none';

const socket = io();




socket.on('connect', () => {
    btnCurrentTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnCurrentTicket.disabled = true;
});

socket.on( 'pending-tickets', pending => {
    if( pending === 0 ){
        lblPending.style.display = 'none';
        divAlert.style.display = '';
    }else{
        lblPending.style.display = '';
        divAlert.style.display = 'none';
        lblPending.innerText = pending;
    }
});


btnCurrentTicket.addEventListener( 'click', () => {

    socket.emit( 'current-ticket', { desk }, ( { ticket } ) => {

        if( !ticket ){
            lblTicket.innerText = 'Nadie';
            return divAlert.style.display = '';
        } 

        lblTicket.innerText = 'Ticket' + ticket.number;
    });

});
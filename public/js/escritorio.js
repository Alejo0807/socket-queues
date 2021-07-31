// Referencias HTML
const lblEscritorio  = document.querySelector('h1');
const lblPendients  = document.querySelector('#lblPendients');
const btnNextTicket  = document.querySelector('#btnNextTicket');
const lblQueue  = document.querySelector('#lblQueue');
const lblTicket  = document.querySelector('small');
const divAlert  = document.querySelector('.alert');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio





const socket = io();

socket.on('connect', () => {
    btnNextTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnNextTicket.disabled = true;
});

socket.on('length-queue', (payload) => {
    if (payload === 0) {
        lblPendients.style.display = 'none';
        divAlert.style.display = '';
    } else {
        divAlert.style.display = 'none';
        lblPendients.innerText = payload;
    }
    
})

btnNextTicket.addEventListener( 'click', () => {
    
    socket.emit('serve-ticket', {escritorio}, ({ok, ticket}) => {
        
        if(!ok) {
            lblTicket.innerText = 'nadie';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.number}`
        
    });

});

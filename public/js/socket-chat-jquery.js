var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// referencias jquery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let textChat = $('#textChat');
let divChatbox= $('#divChatbox');

function renderPersonas(personas){
    let html = '';

html += '<li>',
html += '<a href="javascript:void(0)" class="active"> Chat de <span> '+params.get('sala')+' </span></a>',
html += '</li>'

for(let i = 0; i< personas.length;i++){
    html += '<li>';
html += '<a data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> '+ personas[i].nombre +' <small class="text-success">online</small></span></a>';
html += '</li>';
}

divUsuarios.html(html);


}
function renderMensajes(mensaje,propio){
    let html='';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours()+ ':' + fecha.getMinutes();
    
   if(!propio){
    html += '<li class="animated fadeIn reverso">';
    html += '<div class="chat-img"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFqfhTHLZcM9N1-cnRjrjuYyCCW6pJ3s_zQ&usqp=CAU" alt="user" /></div>';
    html += '<div class="chat-content">';
    html += '<h5>'+mensaje.nombre+'</h5>';
    html += '<div class="box bg-light-info">'+mensaje.mensaje+'</div>';
    html += '</div>';
    html += '<div class="chat-time">'+hora+'</div>';
    html += '</li>';
   }else{
    html += '<li class="reverse">';
    html += '<div class="chat-content">';
    html += '<h5>'+mensaje.nombre+'</h5>';
    html += '<div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
    html += '</div>';
    html += '<div class="chat-img"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhldC--treRs0E0BkO8iVZDPxtgTO6w2J0Ng&usqp=CAU" alt="user" /></div>';
    html += '<div class="chat-time">'+hora+'</div>';
    html += '</li>';
   }



    divChatbox.append(html);
    }

divUsuarios.on('click','a',function(){
    let id = $(this).data('id');
    if(id){
        console.log(id);
    }
});

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

formEnviar.on('submit',function(e){
    e.preventDefault();
    if(textChat.val().trim().length===0){
        return;
    }

    socket.emit('enviarMensaje',{
            nombre:nombre,
            mensaje:textChat.val(),
    },function(mensaje){
        textChat.val('').focus();
        renderMensajes(mensaje,true);
        scrollBottom();
    });

});


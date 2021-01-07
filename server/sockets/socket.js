const { io } = require('../server');
const{Usuarios} = require('../classes/usuarios');
const {crearMensaje}=require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat',(data,callback)=>{
        if(!data.nombre || !data.sala){
            return callback({
                error:true,
                message:'El nombre y la sala son necesarios'
            });
        }

       client.join(data.sala);
       let personas = usuarios.agregarPersona(client.id,data.nombre,data.sala);
       client.broadcast.to(data.sala).emit('listaPersonas', usuarios.obtenerPersonasSala(data.sala));
       callback(personas);
    });

    client.on('enviarMensaje',(data,callback)=>{
        let persona = usuarios.obtenerPersona(client.id);
        let mensaje = crearMensaje(persona.nombre,data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
        callback(mensaje);
    });

    client.on('disconnect',()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Admin',`${personaBorrada.nombre} abandonó el chat!`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.obtenerPersonasSala(personaBorrada.sala));

    });

    // mensaje privado
    client.on('mensajePrivado',data => {
        let persona = usuarios.obtenerPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    });

});
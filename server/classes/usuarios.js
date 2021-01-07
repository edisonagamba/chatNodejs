class Usuarios {
    constructor(){
      this.personas=[];
    }
    agregarPersona(id,nombre,sala){
        let persona = {id,nombre,sala};
        this.personas.push(persona);
        return this.personas;
    }
    obtenerPersona(id){
        let persona = this.personas.filter(persona=>persona.id === id)[0];
        return persona;
    }
    obtenerPersonas(){
        return this.personas;
    }
    obtenerPersonasSala(sala){
       let personasEnSala = this.personas.filter(persona=>persona.sala === sala);
       return personasEnSala;
    }
    borrarPersona(id){
        let personaBorrada = this.obtenerPersona(id);
       this.personas =  this.personas.filter(personas=> personas.id !== id);
       return personaBorrada;
    }
}

module.exports = {
    Usuarios,
}
const exec = require('child_process').exec;

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log("cliente conectado");

            // Escuchar evento: mensaje-to-server
            socket.on('comando', ( data ) => {
                console.log( data );

                socket.emit('inicio', 'Ejecucion iniciada');

                exec (`${data}`,(stdout) =>{
                    console.log('Comando ejecutado');
                    console.log(stdout);
                    socket.emit('fin', 'Ejecucion con exito');
                });
            });
        });
    }
}

4
module.exports = Sockets;
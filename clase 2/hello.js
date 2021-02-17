// Ejemplo de servidor

var http = require('http'); /* Llamada http */

// Función del server

var manejador = function(solicitud, respuesta){
	console.log('Recibimos la petición');
	respuesta.end('Peticion aceptada');
};

// Creación del servidor
var servidor = http.createServer(manejador);

// Escucha
servidor.listen(3000);





/* Configuración de variables de entorno, puertos, recursos */
require('dotenv').config();

/* Importación de módulos (propios o externos) */

const express = require('express'); // Importamos el middlware de express.js
const app = express();     // Indicamos que nuestra app funcionara bajo express
const main_port = process.env.MAIN_PORT;

/* Configuración de  routing o views */
app.set('views','./views');
app.set('view engine', 'pug');

/* Funciones y métodos HTTP con el cliente */
app.get('/', function(req,res){ // Método HTTP-GET


	res.render('index', {title: 'PUG', head: 'Hola', texto: 'Mundo'});

});



app.listen(main_port);



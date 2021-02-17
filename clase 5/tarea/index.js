// Configuración de variables de entorno, puertos, recuros
require('dotenv').config();

/* Importacion de módulos ( propios o externos ) */
const bodyParser = require('body-parser'); // Importamos la libreria body parser para leer parametros
const express = require('express'); // importamos el middleware de express.js (node_moduleS)
const session = require('express-session'); // permite la implementación de cookies
const ratelimit = require('express-rate-limit');
const app = express(); // indicamos que nuestra app funcionara bajo express
const main_port = process.env.MAIN_PORT;

const limiter = ratelimit({
	windowMs: 5 * 60 * 1000, // 5 minutos permitidos
	max: 100, // peticiones al servidor dentro de la ventana de tiempo
	 
});



// configuración del routing o views
app.set('views','./views');
app.set('view engine','pug');


// Se define los recursos estaticos
app.use(express.static('public'));
app.use('/users', limiter);

// se declara que la app podra extraer parametros
//app.use(bodyParser.json()); // formato JSON
app.use(bodyParser.json({limit: '100kb' }));
app.use(bodyParser.json({parameterLimit: '1000'}));
app.use(bodyParser.urlencoded({extended: true})); // encoded
app.use(session({secret: '48a0572e6e7cfc81b428b18da87cf613'})); // palabra secreta para sesión
// Oscar en MD5 = 48a0572e6e7cfc81b428b18da87cf613

/* Routing */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/users', require('./deployments/session'));

app.get('/', function(req,res){
	res.render('index');
});

app.get('/login', function(req,res){
	res.render('login');
});

app.use(function(req,res){
	//req.status(404);
	res.render('404');

});

app.listen(main_port);

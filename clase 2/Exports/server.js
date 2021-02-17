const http = require('http');
const fs = require('fs');
const Operaciones = require('./modulo.js');

var sum = Operaciones.suma;
var res = Operaciones.resta;

console.log(res);

http.createServer(function(req,res){

	fs.readFile('./index.html', function(err,html){

		var descripcion = sum(5,5).toString();
	//	var descripcion2 = res(10,2);

		console.log(descripcion);
	//	console.log(descripcion2);

		// res.writeHead(404,{"Content-Type":"application/json"})
		res.writeHead(200,{"Content-Type":"text/html"}); 

		res.write(html);

		// res.write(JSON.stringify({nombre:'Oscar',username:'STK'}));
		
		res.end();

	});



}).listen(3000);

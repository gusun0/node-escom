var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){

	fs.readFile('./index.html', function(err,html){

		console.log(html);

		// res.writeHead(404,{"Content-Type":"application/json"})
		res.writeHead(404,{"Content-Type":"text/html"}); 
		// 200 todo bien
		// 400 no se encontro
		// 300 ya se movio 
		// 500 error
		

		res.write(html);

		// res.write(JSON.stringify({nombre:'Oscar',username:'STK'}));
		
		res.end();

	});



}).listen(3000);

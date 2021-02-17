const { Router } = require('express');
const router = Router();

const User = require('../models/user').User;


router.get('/', function(req,res){
	res.render('users/home');
});


router.post('/register', function(req,res){ // método post para parametros que se invocaran

	var user = new User({
		Nombre: req.body.Nombre,
		Password: req.body.Password,
		Email: req.body.Email,

	});

	// function(error, obj, numero)
	
	user.save(function(err,obj){
		if(err != null){
			console.log(String(err));
			res.redirect('/new_user');
		}else{
			console.log('Usuario se a registrado');
			console.log(obj);
			res.redirect('/'); // redirecciona como http
			
		}
	});
});

// log in de usuarios
// localhost:3000/users/sign
router.post('/sign', function(req,res){  // metodo para desplegar la base
	

	console.log('verificando entrada de usuario');

	// query, fields y callback
	User.find({Email: req.body.Email, Password: req.body.Password}, function(err,doc){

		if(Object.entries(doc).length === 0){
			console.log('El usuario que intento registrar no estaba registrado');
			res.redirect('/login');
		}else{
			console.log('ingreso al sistema usuario: ' + doc[0].Email );
			console.log('Creando sesion');
			req.session.user_id = doc[0]._id;
			console.log('Sesion creada: ' + req.session.user_id);
			res.redirect('/users');
		}
	}); // devuelve un arreglo a los documentos
});

// modificacion de sesion
router.get('/logout', function(req,res){

	req.session.destroy();
	res.redirect('/');
});


router.get('/mydata', function(req,res){
	id = req.session.user_id;
	if(id.toString() == 'undefined'){
		res.render();
	}else{
		res.render('users/mydata');

	}
});

router.post('/update', function(req,res){
	
	var filter = { _id: req.session.user_id };
	var update = { 
		$set: {
			Nombre: req.body.Nombre,
			Email: req.body.Email,
			Password: req.body.Password
		}
	};

	User.findOneAndUpdate(filter, update, { returnOriginal:false}, function(err,doc){
		if(err){
			console.log(err);
		}else{
			res.redirect('/users');
			console.log(doc);
		}
	});

});


router.post('/delete', function(req,res){

	var filter = { _id: req.session.user_id };

	User.findOneAndDelete(filter, function(err,doc){
		if(err){
			console.log(err);
		}else{
			res.redirect('/login');
			console.log(doc);
		}
	});

});


module.exports = router;

const { Router } = require('express');
const router = Router();

router.get('/', function(req,res){ // Método principal
	if(String(req.session.user_id) == 'undefined') {
		res.render('index');
	}else{
		res.redirect('/users');
	}
});

router.get('/login', function(req,res){ // metodo GET que se invocara cuando entre la directiva login
	res.render('login');
});

router.get('/new_user', function(req,res){ // metodo GET que se invocara cuando entre la directiva new_user
	res.render('new_user');
});

router.get('/home', function(req,res){ // metodo GET que se invocara cuando entre la directiva home 
	res.render('users/home');
});

module.exports = router;


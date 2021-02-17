const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DB = process.env.DB;

mongoose.connect(DB); // Si no existe, se crea


const user_Schema = new Schema({
	
	Nombre: {
		type: String, 
		maxlength: [10, 'Maximo 10 caracteres']
	},
	Password: {
		type: String, 
		minlength: [5, 'Minimo 5 caracteres']
	},
	Email: {
		type: String, 
		required: 'Correo Oblligatorio'
	}
});

var User = mongoose.model('User', user_Schema);

module.exports.User = User;

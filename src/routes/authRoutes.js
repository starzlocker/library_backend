
const {AuthController} = require('../controllers/authController');

const router = require('express').Router();
const {check}= require('express-validator'); 
const bcrypt = require('bcrypt');

router.post('/login', [
	check("password", "A senha deve ter 6 ou mais dígitos."),
	check("email", "Digite um e-mail válido")
		.isEmail(),
], AuthController.login);

// router.post('/signup', [
// 	check("password", "A senha deve ter 6 ou mais dígitos.")
// 		.isLength({min: 6}),
// 	check("email", "Digite um e-mail válido!")
// 		.isEmail(),
// 	check("name", "Nome é obrigatório"),
// 	check("last_name", "Sobrenome é obrigatório")
// ], AuthController.signup);

router.post('/logout', AuthController.logout);

router.post('/test_auth', [
	AuthController.verifyJWT,
], 	(req, res) => {
	res.json({
		success: true,
		message: "Usuário autorizado! Token OK"
	})
})

module.exports = router


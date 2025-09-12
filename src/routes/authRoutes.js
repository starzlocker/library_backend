
const {AuthController} = require('../controllers/authController');

const router = require('express').Router();
const {check}= require('express-validator'); 
const bcrypt = require('bcrypt');

router.post('/login', [
	check("password", "A senha deve ter 6 ou mais dígitos.")
		.isLength(6)
], AuthController.login)

module.exports = router


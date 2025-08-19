const router = require('express').Router();
const {check, validationResult }= require('express-validator'); 
const bcrypt = require('bcrypt');

let senha;

router.post('/signup', [
	check("password", "A senha deve ter 6 ou mais dígitos.")
		.isLength(6)
], async (req, res) => {
	const {password} = req.body;
	
	const {errors} = validationResult(req);
	
	if (errors.length) {
		res.status(404).json({
			errors
		})
	}

	senha = await bcrypt.hash(password, 10);

	res.json({
		success: true,
		message: senha
	})
})

router.post('/login', async (req, res) => {
	const {password} = req.body;

	const validatePassword = await bcrypt.compare(password, senha);

})

module.exports = router


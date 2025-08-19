const router = require('express').Router();
const {check, validationResult }= require('express-validator'); 
const bcrypt = require('bcrypt');

router.get('/', [
	check("password", "A senha deve ter 6 ou mais dígitos.")
		.isLength(6)
], (req, res) => {
	const {password} = req.body;
	
	const errors = validationResult(req);
	
	if (errors.length) {
		res.json({
			status:404,
			errors
		})
	} 
})
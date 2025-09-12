const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const {User} = require('../repositories/User');
var senha ="$2b$10$cOJ.v1sAM1nbUxDnOP685eVM2fvzC/90TFcowxtFpqLU2RXOqZ8he";

class AuthController {
	static async login (req, res) {
		const {password} = req.body;
		
		const {errors} = validationResult(req);
		
		if (errors.length) {
			res.status(404).json({
				errors
			})
		}

		// senha = await bcrypt.hash(password, 10);

		const isValidPassword = await bcrypt.compare(password, senha)
	
		res.json({
			success: true,
			message: `${isValidPassword}`
		})
	}

	static async signup (req, res) {
		const {email,password,fullName} = req.body;
		const {errors} = validationResult(req);
		if (errors.length) {
			res.status(404).json({
				errors
			})
		}

		
		const user = await User.createUser(
			email,
			password,
			fullName
		)
		
		res.json({
			success: true,
			message: `${user}`
		})


	}
}

module.exports = {AuthController}
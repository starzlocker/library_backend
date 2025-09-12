const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

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
}

module.exports = {AuthController}
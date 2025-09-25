const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const {User} = require('../repositories/User');
const {UserModel} = require('../models/User');

const jwt = require('jsonwebtoken');
const BLACKLIST = {};
class AuthController {
	static async login (req, res) {
		const {email,password} = req.body;
		
		const {errors} = validationResult(req);
		
		if (errors.length) {
			res.status(404).json({
				errors
			})
		}

		const user = await User.getUserByEmail(email);

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			res.status(401).json({
				success: false,
				message: `Erro: senha inválida!` 
			})
		}

		const signedToken = jwt.sign(
			{id: user.id}, 
			process.env.JWT_SECRET, 
			{expiresIn: parseInt(process.env.JWT_EXPIRES)}
		);
		
		res.json({
			success: true,
			message: `${user.id}`,
			token: signedToken,
		})
	}

	static async signup (req, res) {
		const {email,password,name,last_name} = req.body;
		const {errors} = validationResult(req);
		if (errors.length) {
			res.status(404).json({
				errors
			})
		}
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const encriptedPwd = await bcrypt.hash(password, salt);


		const userID = await User.createUser(
			name,
			last_name,
			email,
			encriptedPwd,
		);

		if (!userID) {
			res.status(400).json({
				success: false,
				message: "Não foi possível criar o usuário."
			})
		}

		const signedToken = jwt.sign(
			{userID}, 
			process.env.JWT_SECRET, 
			{expiresIn: parseInt(process.env.JWT_EXPIRES)});
		
		res.json({
			success: true,
			message: `${userID}`,
			token: signedToken,
		})
	}

	static async logout (req, res) {
		const token = req.headers["authorization"].replace("Bearer ", '');

		BLACKLIST[token] = true;

		setTimeout(() => {delete BLACKLIST[token]}, parseInt(process.env.JWT_EXPIRES) * 1000);

		res.json({
			success: true,
			token:null
		});
	}

	static async verifyJWT (req, res, next) {
		const token = req.headers["authorization"].replace("Bearer ", '');
		
		if (Object.hasOwn(BLACKLIST, token) && BLACKLIST[token]) {
			return res.status(403).json({
				success: false,
				message: "Token inválido!"
			});
		} 
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
	
			if (!decoded) {
				return res.status(403).json({
					success: false,
					message: "Token inválido"
				});
			}
	
			res.locals.token = decoded;
	
			return next();
		} catch (error) {
			return res.status(403).json({
				message: error.message
			})
		}
	}
}

module.exports = {AuthController}
jest.mock('../repositories/User.js');
jest.mock('../database/setup.js');
// testes e afim
const {AuthController} = require('../controllers/authController.js');
const {User} = require('../repositories/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

test("login", async() => {
	const req = {
		body: {
			email: "user@example.com",
			password: "password123"
		}
	}

	User.getUserByEmail.mockResolvedValue({
		id: 1,
		name: "Test",
		last_name: "User",
		email: "user@example.com",
		password: await bcrypt.hash("password123", 10),
		role: "user"
	});

	const res = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis()
	}

	await AuthController.login(req, res);
	
	expect(res.json).toHaveBeenCalledWith(
	  expect.objectContaining({
		success: true,
		token: expect.any(String)
	  })
	);
	
	const token = res.json.mock.calls[0][0].token;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	expect(decoded).toHaveProperty('id', 1);
});

test("login with invalid password", async() => {
	const req = {
		body: {
			email: "user@example.com",
			password: "password1234"
		}
	}

	User.getUserByEmail.mockResolvedValue({
		id: 1,
		name: "Test",
		last_name: "User",
		email: "user@example.com",
		password: await bcrypt.hash("password123", 10),
		role: "user"
	});

	const res = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis()
	}

	await AuthController.login(req, res);
	expect(res.status).toHaveBeenLastCalledWith(401);
	expect(res.json).toHaveBeenCalledWith(
	  expect.objectContaining({
		success: false,
		message: `Erro: senha inválida!` 
	  })
	);
});

test("login with empty password", async() => {
	const req = {
		body: {
			email: "user2@example.com",
			password: ""
		}
	}

	User.getUserByEmail.mockResolvedValue({
		id: 1,
		name: "Test",
		last_name: "User",
		email: "user@example.com",
		password: await bcrypt.hash("password123", 10),
		role: "user"
	});

	const res = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis()
	}

	await AuthController.login(req, res);
	expect(res.status).toHaveBeenLastCalledWith(401);
	expect(res.json).toHaveBeenCalledWith(
		expect.objectContaining({
			"message": "Erro: senha inválida!", 
			"success": false
		})
	)
});
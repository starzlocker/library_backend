
const bcrypt = require('bcrypt');

router.post('/login', [
	check("password", "A senha deve ter 6 ou mais dígitos."),
	check("email", "Digite um e-mail válido")
		.isEmail(),
], AuthController.login);

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


import {bookController} from '../controllers/bookController.js';
const {AuthController} = require("../controllers/authController")
const { check } =  require('express-validator');

router.get('/', bookController.getBooks);

router.get('/:id', bookController.getBookById);

router.post('/', [
	AuthController.verifyJWT
], bookController.createBook);

router.put('/:id', [
	AuthController.verifyJWT
], bookController.updateBook)

router.delete('/:id', [
	AuthController.verifyJWT
], bookController.deleteBook)

module.exports = router;
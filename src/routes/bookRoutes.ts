import { Router } from 'express';
import * as BookControler from '../controllers/BookController.js';
const {AuthController} = require("../controllers/authController")
const { check } =  require('express-validator');

const router = Router()

router.get('/', BookControler.getBooks);

router.get('/:id', BookControler.getBookById);

router.post('/', [
	AuthController.verifyJWT
], BookControler.createBook);

router.put('/:id', [
	AuthController.verifyJWT
], BookControler.updateBook)

router.delete('/:id', [
	AuthController.verifyJWT
], BookControler.deleteBook)
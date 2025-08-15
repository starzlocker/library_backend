const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControler');

router.get('/', bookController.getBooks);

router.get('/:id', bookController.getBookByTitle);

router.put('/:id', bookController.updateBook)

router.delete('/:id', bookController.deleteBook)

module.exports = router;
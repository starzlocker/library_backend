import { Router } from 'express';
import * as BookControler from '../controllers/BookController.js';

const router = Router()

router.get('/', BookControler.getBooks);

router.get('/:id', BookControler.getBookById);

router.post('/', BookControler.createBook);

router.put('/:id', BookControler.updateBook)

router.delete('/:id', BookControler.deleteBook)


export default router;
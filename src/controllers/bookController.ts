import { BookRepository } from 'src/repositories/BookRepository.js';
import { Author } from '../repositories/Author';
import { BookModel } from '../models/Book.ts';
import { Genre } from '../repositories/Genre';
import { GoogleBooks } from '../services/googleBookService';
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import { logger } from '../config/logger';


const getBooks = async (req: Request, res: Response) => {
  try {
    const { title, author, year, genre } = req.query;

    if ((title && typeof title !== 'string') || (author && typeof author !== 'string') || (year && typeof year !== 'string') || (genre && typeof genre !== 'string')) {
      return res.status(400).json({
        message: 'Invalid query params',
      });
    }

    const books = await BookRepository.getBooks({title, author, year, genre});

    if (!books.length) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.json({
      success: true,
      data: books,
    });

  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    logger.error(`Failed to fetch books: ${err}`);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id || typeof id != 'string') {
      res.status(400).json({
        message: 'Invalid query params',
      });
    }
    const book = await BookRepository.getBookById(id);

    if (!book) {
      res.status(404).json({
        message: `Book not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const updateBook = async (req:Request, res:Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    data.id = req.params.id;
    if (!data.id || typeof data.id != 'string') {
      res.status(400).json({
        message: 'Requisição inválida, o id do livro não foi fornecido.',
      });
    }

    if (!data || typeof data != 'object') {
      res.status(400).json({
        message: 'Requisição inválida, o objeto do livro é inválido.',
      });
    }
    const book = await BookRepository.updateBook(data);

    if (!book) {
      res.status(404).json({
        message: `Livro não encontrado.`,
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e instanceof Error ? e.message : String(e),
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    if (!id || typeof id != 'string') {
      res.status(400).json({
        message: 'Requisição inválida, o id do livro não foi fornecido.',
      });
    }

    const book = await BookRepository.deleteBook(id);

    if (!book) {
      res.status(404).json({
        message: `Livro não encontrado.`,
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    logger.error(`Erro ao deletar livro: ${err}`);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    const mandatoryFields = ['title', 'author', 'genre', 'year'];

    const missingFields = [];

    const dataKeys = Object.keys(data);

    for (let k of mandatoryFields) {
      if (!dataKeys.includes(k)) {
        missingFields.push(k);
      }
    }

    if (missingFields.length) {
      return res.status(400).json({
        message: `Dados imcompletos: ${
          missingFields.length > 1
            ? missingFields.join(', ') + ' estão ausentes e são obrigatórios.'
            : missingFields[0] + ' está ausente e é obrigatório.'
        }`,
      });
    }

    if (!data || typeof data != 'object') {
      return res.status(400).json({
        message: 'Dados do livro inválidos.',
      });
    }

    if (!data.author || typeof data.author != 'string' || !data.author.trim()) {
      return res.status(400).json({
        message: 'Nome do autor não foi fornecido.',
      });
    }

    if (!data.genre || typeof data.genre != 'string' || !data.genre.trim()) {
      throw new Error('Gênero do livro não foi fornecido.');
    }

    const author_db = await AuthorRepository.getAuthorByName(data.author);
    const genre_db = await Genre.getGenreByName(data.genre);

    data.author_id = author_db?.id || null;
    data.genre_id = genre_db?.id || null;

    const google = new GoogleBooks();

    const book = new BookModel(data);

    const bookInfo = await google.searchBookByTitle(book.title);

    if (bookInfo?.volumeInfo) {
      const volumeInfo = bookInfo.volumeInfo;
      book.description = volumeInfo.description;
      if (volumeInfo?.imageLinks) {
        book.coverUrl = volumeInfo.imageLinks?.thumbnail;
      }
    }

    if (bookInfo?.saleInfo) {
      book.price = bookInfo?.saleInfo?.listPrice?.amount || 0.0;
    }

    const createdBook = await BookRepository.createBook(book);
    res.json({
      success: true,
      data: createdBook,
    });
  } catch (e) {
    if (e instanceof Error) {
      logger.error(`Erro ao criar livro: ${e.stack}`);
    }

    return res.status(500).json({
      success: false,
      error: e instanceof Error ? e.message : String(e)
    });
  }
};

module.exports = {
  getBookById: getBookById,
  getBooks,
  updateBook,
  deleteBook,
  createBook,
};

import { BookRepository } from '../repositories/BookRepository.js';
import { GoogleBooks } from '../services/googleBookService.js';
import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../config/logger.js';
import { AuthorRepository } from '../repositories/AuthorRepository.js';
import { GenreRepository } from '../repositories/GenreRepository.js';
import { assertUpdateBookDTO } from '../DTOs/Book/UpdateBookDTO.js';
import { assertGetBookDTO } from '../DTOs/Book/GetBookDTO.js';
import { assertCreateBookDTO } from '../DTOs/Book/CreateBookDTO.js';
import { bookDTOasBook } from '../utils/mappers.js';

const NOT_FOUND = 'Book not found'
const SERVER_ERROR = 'Internal server error'
const INVALID_QUERY_PARAMS = 'Invalid query params'
const FAILED_FETCH = 'Failed to fetch books'
const INVALID_DATA = 'Invalid data'
const CREATE_ERROR = 'Failed to create book';
const DELETE_ERROR = 'Failed to delete book';


export const getBooks = async (req: Request, res: Response) => {
  try {
    const data = req.query;

    try {
      assertGetBookDTO(data);
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      return res.status(400).json({
        message: `${INVALID_QUERY_PARAMS}: ${err}`,
      });
    }

    const dbBooks = await BookRepository.getBooks(data);

    if (!dbBooks) {
      return res.status(404).json({
        message: NOT_FOUND,
      });
    }

    const books = dbBooks.map(b => bookDTOasBook(b));
  
    res.status(200).json({
      success: true,
      data: books,
    });

  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    logger.error(`: ${err}`);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    let id;

    try {
      id = Number(req.params.id);
    } catch {
      return res.status(400).json({
        message: INVALID_QUERY_PARAMS,
      });
    }

    const dbBook = await BookRepository.getBookById(id);

    if (!dbBook) {
      res.status(404).json({
        message: NOT_FOUND,
      });
    }

    const book = bookDTOasBook(dbBook);

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

export const updateBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let id;

  try {
    id = Number(req.params.id);
  } catch {
    return res.status(400).json({
      message: INVALID_QUERY_PARAMS,
    });
  }

  const data = {...req.body, id: id};

  try {
    assertUpdateBookDTO(data);
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return res.status(400).json({
      message: `${INVALID_DATA}: ${err}`
    });
  }

  let dbBook;

  try {
    dbBook = await BookRepository.updateBook(data);
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return res.status(500).json({
      message: `${SERVER_ERROR}: ${err}`,
    });
  }

  if (!dbBook) {
    return res.status(404).json({
      message: NOT_FOUND,
    });
  }

  const book = bookDTOasBook(dbBook);

  return res.status(200).json({
    success: true,
    data: book,
  });
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let id;

    try {
      id = Number(req.params.id);
    } catch {
      return res.status(400).json({
        message: INVALID_QUERY_PARAMS,
      });
    }

    const dbBook = await BookRepository.deleteBook(id);

    if (!dbBook) {
      return res.status(404).json({
        message: NOT_FOUND,
      });
    }

    const book = bookDTOasBook(dbBook)

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    logger.error(`${DELETE_ERROR}: ${err}`);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    assertCreateBookDTO(data);

    const author_db = await AuthorRepository.getAuthorByName(data.author);
    const genre_db = await GenreRepository.getGenreByName(data.genre);

    data.author_id = author_db?.id || null;
    data.genre_id = genre_db?.id || null;

    const google = new GoogleBooks();

    const {description, price, coverUrl} = await google.getBookInfo(data.title);

    data.description = description || data.description
    data.price = price || data.price
    data.cover_url = coverUrl || data.cover_url

    const dbBook = await BookRepository.createBook(data);

    if (!dbBook) {
      return res.status(404).json({
        message: NOT_FOUND,
      });
    }

    const book = bookDTOasBook(dbBook);

    res.json({
      success: true,
      data: book,
    });

  } catch (e) {
    if (e instanceof Error) {
      logger.error(`${CREATE_ERROR}: ${e.stack}`);
    }

    return res.status(500).json({
      success: false,
      error: e instanceof Error ? e.message : String(e),
    });
  }
};
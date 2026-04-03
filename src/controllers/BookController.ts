import { BookRepository } from '../repositories/BookRepository.js';
// import { GoogleBooks } from '../services/googleBookService.js';
import type { Request, Response } from 'express';
import { logger } from '../config/logger.js';
import { AuthorRepository } from '../repositories/AuthorRepository.js';
import { GenreRepository } from '../repositories/GenreRepository.js';
import { assertGetBookDTO } from '../DTOs/Book/GetBookDTO.js';
import { assertCreateBookDTO } from '../DTOs/Book/CreateBookDTO.js';
import { mapBookUpdateDTOtoDB, mapDBBookDTOasBook } from '../utils/mappers.js';
import { isNonNullable } from '../utils/TypeAssertions.js';
import {
  assertUpdateBookDTO,
  UpdateBookDTO,
} from '../DTOs/Book/UpdateBookDTO.js';

const NOT_FOUND = 'Book not found';
const SERVER_ERROR = 'Internal server error';
const INVALID_QUERY_PARAMS = 'Invalid query params';
const GET_ERROR = 'Failed to get books';
const INVALID_DATA = 'Invalid data';
const CREATE_ERROR = 'Failed to create book';
const DELETE_ERROR = 'Failed to delete book';
const CONFLICT = 'Book is already registered';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { page, ...params } = req.query;

    let pageNumber;

    try {
      if (isNonNullable(page)) pageNumber = Number(page);
      assertGetBookDTO(params);
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      return res.status(400).json({
        message: `${INVALID_QUERY_PARAMS}: ${err}`,
      });
    }

    const { data, totalItems } = await BookRepository.getBooks(
      params,
      pageNumber,
    );

    if (!data.length) {
      return res.status(404).json({
        success: false,
        data: [],
        page: pageNumber ?? 1,
        totalItems,
        message: NOT_FOUND,
      });
    }

    const books = data.map((b) => mapDBBookDTOasBook(b));

    res.status(200).json({
      success: true,
      data: books,
      page: pageNumber ?? 1,
      totalItems,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    logger.error(`${GET_ERROR}: ${e instanceof Error ? e.stack : ''}`);
    res.status(500).json(err);
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

    const book = mapDBBookDTOasBook(dbBook);

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
  let id;

  try {
    id = Number(req.params.id);
  } catch {
    return res.status(400).json({
      message: INVALID_QUERY_PARAMS,
    });
  }

  const data = req.body as UpdateBookDTO;

  try {
    assertUpdateBookDTO(data);
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return res.status(400).json({
      message: `${INVALID_DATA}: ${err}`,
    });
  }

  const dbBook = mapBookUpdateDTOtoDB(data);

  let updatedId;

  try {
    updatedId = await BookRepository.updateBook(id, dbBook);
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return res.status(500).json({
      message: `${SERVER_ERROR}: ${err}`,
    });
  }

  if (!updatedId) {
    return res.status(404).json({
      message: NOT_FOUND,
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedId,
  });
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    let id;

    try {
      id = Number(req.params.id);
    } catch {
      return res.status(400).json({
        message: INVALID_QUERY_PARAMS,
      });
    }

    const deletedId = await BookRepository.deleteBook(id);

    if (!deletedId) {
      return res.status(404).json({
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedId,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    logger.error(`${DELETE_ERROR}: ${e instanceof Error ? e.stack : ''}`);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    assertCreateBookDTO(data);

    const author_db = await AuthorRepository.createAuthorIfDontExists({
      name: data.author.replace(/^\w|\s+\w/g, (e) => e.toUpperCase()),
    });
    const genre_db = await GenreRepository.createGenreIfDontExists({
      name: data.genre.replace(/^\w|\s+\w/g, (e) => e.toUpperCase()),
    });

    data.author_id = author_db.id;
    data.genre_id = genre_db.id;

    // const google = new GoogleBooks();

    // const { description='', price=0, coverUrl=null } = await google.getBookInfo(
    //   data.title,
    // );

    data.description = data.description ?? 'Sem descrição';
    data.price = data.price ?? 0;
    data.cover_url = data.cover_url ?? null;

    const createdId = await BookRepository.createBook(data);

    if (createdId === -1) {
      return res.status(409).json({
        message: CONFLICT,
      });
    }

    res.json({
      success: true,
      data: createdId,
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

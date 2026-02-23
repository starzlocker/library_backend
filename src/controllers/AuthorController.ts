import type { Request, Response, NextFunction } from 'express';
import { assertNonEmptyString, assertNonNullable } from '../utils/TypeAssertions.js';
import { AuthorRepository } from '../repositories/AuthorRepository.js';
import { DBAuthorDTOasAuthor } from '../utils/mappers.js';
import { assertCreateAuthorDTO } from '../DTOs/Author/CreateAuthorDTO.js';
import { assertUpdateAuthorDTO } from '../DTOs/Author/UpdateAuthorDTO.js';

const INVALID_DATA = 'Invalid object shape for type Author';
const INVALID_PARAMS = 'Invalid params';
const NOT_FOUND = 'Author not found';
const SERVER_ERROR = 'Internal server error';

export const getAuthorByName = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    assertNonNullable(name);
    assertNonEmptyString(name);
  } catch {
    return res.status(400).json({
      success: false,
      message: INVALID_PARAMS
    });
  }

  try {
    const dbAuthor = await AuthorRepository.getAuthorByName(name);
    if (!dbAuthor) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const author = DBAuthorDTOasAuthor(dbAuthor);

    return res.status(200).json({
      success: true,
      data: author,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error(`${SERVER_ERROR}: ${err}`);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    try {
      assertCreateAuthorDTO(data);
    } catch {
      return res.status(400).json({
        success: false,
        message: INVALID_DATA,
      });
    }

    const dbAuthor = await AuthorRepository.createAuthor(data);

    if (!dbAuthor) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const author = DBAuthorDTOasAuthor(dbAuthor);

    res.status(200).json({
      success: true,
      message: author,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error(` ${err}`);
    return res.status(500).json({
      success: false,
      error: `${SERVER_ERROR}: ${err}`,
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    let id;

    try {
      id = Number(req.params.id);
    } catch {
      return res.status(400).json({
        success: false,
        message: INVALID_PARAMS,
      });
    }

    const dbAuthor = await AuthorRepository.deleteAuthor(id);

    if (!dbAuthor) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const author = DBAuthorDTOasAuthor(dbAuthor);

    res.status(200).json({
      success: true,
      message: author,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error(` ${err}`);
    return res.status(500).json({
      success: false,
      error: `${SERVER_ERROR}: ${err}`,
    });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    let id;

    try {
      id = Number(req.params.id);
    } catch {
      return res.status(400).json({
        success: false,
        message: INVALID_PARAMS,
      });
    }

    const data = { ...req.body, id };

    try {
      assertUpdateAuthorDTO(data);
    } catch {
      return res.status(400).json({
        success: false,
        message: INVALID_DATA,
      });
    }

    const dbAuthor = await AuthorRepository.updateAuthor(data);

    if (!dbAuthor) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const author = DBAuthorDTOasAuthor(dbAuthor);

    res.status(200).json({
      success: true,
      message: author,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error(` ${err}`);
    return res.status(500).json({
      success: false,
      error: `${SERVER_ERROR}: ${err}`,
    });
  }
};

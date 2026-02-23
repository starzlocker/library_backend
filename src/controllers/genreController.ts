import type { Request, Response } from 'express';
import { GenreRepository } from '../repositories/GenreRepository.js';
import {
  assertNonEmptyString,
  assertNonNullable,
} from '../utils/TypeAssertions.js';
import { DBGenreDTOasGenre } from '../utils/mappers.js';
import { assertUpdateGenreDTO  } from '../DTOs/Genre/UpdateGenreDTO.js';
import { assertCreateGenreDTO } from '../DTOs/Genre/CreateGenreDTO.js';

const INVALID_DATA = 'Invalid object shape for type Genre';
const INVALID_PARAMS = 'Invalid params';
const NOT_FOUND = 'Genre not found';
const SERVER_ERROR = 'Internal server error';

export const getGenreByName = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    assertNonNullable(name);
    assertNonEmptyString(name);
  } catch {
    return res.status(400).json({
      success: false,
      message: INVALID_PARAMS,
    });
  }

  try {
    const dbGenre = await GenreRepository.getGenreByName(name);
    if (!dbGenre) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const genre = DBGenreDTOasGenre(dbGenre);

    return res.status(200).json({
      success: true,
      data: genre,
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

export const createGenre = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    try {
      assertCreateGenreDTO(data);
    } catch {
      return res.status(400).json({
        success: false,
        message: INVALID_DATA,
      });
    }

    const dbGenre = await GenreRepository.createGenre(data);

    if (!dbGenre) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const genre = DBGenreDTOasGenre(dbGenre);

    res.status(200).json({
      success: true,
      message: genre,
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

export const deleteGenre = async (req: Request, res: Response) => {
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

    const dbGenre = await GenreRepository.deleteGenre(id);

    if (!dbGenre) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const genre = DBGenreDTOasGenre(dbGenre);

    res.status(200).json({
      success: true,
      message: genre,
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

export const updateGenre = async (req: Request, res: Response) => {
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
      assertUpdateGenreDTO(data);
    } catch {
      return res.status(400).json({
        success: false,
        message: INVALID_DATA,
      });
    }

    const dbGenre = await GenreRepository.updateGenre(data);

    if (!dbGenre) {
      return res.status(404).json({
        success: false,
        message: NOT_FOUND,
      });
    }

    const genre = DBGenreDTOasGenre(dbGenre);

    res.status(200).json({
      success: true,
      message: genre,
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

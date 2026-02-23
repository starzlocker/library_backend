import type { Request, Response, NextFunction } from 'express';
import { GenreRepository } from '../repositories/GenreRepository.js';
import {
  assertNonEmptyString,
  assertNonNullable,
} from '../utils/TypeAssertions.js';
import { DBGenreDTOasGenre } from '../utils/mappers.js';

export const getGenreByName = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    assertNonNullable(name);
    assertNonEmptyString(name);
  } catch {
    return res.status(400).json({
      success: false,
      message: 'Nome do gênero não foi fornecido!',
    });
  }

  try {
    const dbGenre = await GenreRepository.getGenreByName(name);
    if (!dbGenre) {
      return res.status(404).json({
        success: false,
        message: `Gênero ${name} não encontrado.`,
      });
    }

    const genre = DBGenreDTOasGenre(dbGenre)

    return res.status(200).json({
      success: true,
      data: genre,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error(`Erro ao buscar gênero por nome: ${err}`);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

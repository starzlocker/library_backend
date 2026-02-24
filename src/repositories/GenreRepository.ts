import { Genre } from '../models/Genre.js';
import { logger } from '../config/logger.js';
import { db } from '../config/database.js';
import { assertGenreDTO } from '../DTOs/Genre/DBGenreDTO.js';
import type { UpdateGenreDTO } from '../DTOs/Genre/UpdateGenreDTO.js';
import type { CreateGenreDTO } from '../DTOs/Genre/CreateGenreDTO.js';

export class GenreRepository {
  static async getGenreByName(genreName: string) {
    try {
      const res = await db.run('select * from genres where name ilike $1', [
        genreName,
      ]);
      if (res.rows.length === 0) {
        return null;
      }
      const genre = res.rows[0];
      assertGenreDTO(genre);
      return genre;
    } catch (e) {
      logger.error(
        `Failed to fetch genre: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async getGenreById(id: number) {
    try {
      const res = await db.run('select * from genres where id = $1', [id]);
      if (res.rows.length === 0) {
        return null;
      }
      const genre = res.rows[0];
      assertGenreDTO(genre);
      return genre;
    } catch (e) {
      logger.error(
        `Failed to fetch genre: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async createGenre(data: CreateGenreDTO) {
    try {
      const genre = new Genre(data);
      const res = await db.run(
        'insert into genres (name) VALUES ($1) RETURNING *',
        [genre.name],
      );

      const book = res.rows[0];

      assertGenreDTO(book);
      return book;
    } catch (e) {
      logger.error(
        `Failed to insert genre: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async createGenreIfDontExists(data: CreateGenreDTO) {
    try {
      const genre = new Genre(data);
      const res = await db.run(`select * from genres where name ilike $1`, [
        genre.name,
      ]);

      if (res.rows.length === 0) {
        return GenreRepository.createGenre(data);
      }

      const dbGenre = res.rows[0];

      assertGenreDTO(dbGenre);
      return dbGenre;
    } catch (e) {
      logger.error(
        `Failed to insert genre: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async updateGenre(data: UpdateGenreDTO) {
    try {
      const res = await db.run('update genres set ${} where id = $1 RETURNING *', [
        data.id,
      ]);

      const genre = res.rows[0];

      assertGenreDTO(genre);

      return genre;
    } catch (e) {
      logger.error(
        `Failed to fetch genre: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e

    }
  }

  static async deleteGenre(id: number) {
    try {
      const res = await db.run('select * from genres where id = $1 RETURNING *', [id]);

      const genre = res.rows[0];
      assertGenreDTO(genre);
      return genre;
    } catch (e) {
      logger.error(
        `Failed to fetch genre: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }
}

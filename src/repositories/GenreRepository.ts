import { Genre } from '../models/Genre.js';
import { logger } from '../config/logger.js';
import { db } from '../config/database.js';
import { assertGenreDTO } from '../DTOs/Genre/DBGenreDTO.js';
import type { UpdateGenreDTO } from '../DTOs/Genre/UpdateGenreDTO.js';
import type { CreateGenreDTO } from '../DTOs/Genre/CreateGenreDTO.js';

export class GenreRepository {
  static async getGenreByName(genreName: string) {
    try {
      const res = await db.run('select * from genres where name = $1', [
        genreName,
      ]);
      if (res.rows.length === 0) {
        return null;
      }
      const genre = res.rows[0];
      assertGenreDTO(genre);
      return genre;
    } catch (error) {
      logger.error(`Failed to fetch genre: ${(error instanceof Error ? error.stack : '')}`);
    }
  }

  static async getGenreById(id: number) {
    try {
      const res = await db.run('select * from genres where id = $1', [
        id,
      ]);
      if (res.rows.length === 0) {
        return null;
      }
      const genre = res.rows[0];
      assertGenreDTO(genre);
      return genre;
    } catch (error) {
      logger.error(`Failed to fetch genre: ${(error instanceof Error ? error.stack : '')}`);
    }
  }

  static async createGenre(data: CreateGenreDTO) {
    try {
      const genre = new Genre(data);
      const res = await db.run(
        'insert into genres (name) VALUES ($1) RETURNING *',
        [genre.name],
      );
      if (res.rows.length === 0) {
        return null;
      }

      const book = res.rows[0];

      assertGenreDTO(book);
      return book;
    } catch (error) {

      logger.error(`Failed to insert genre: ${(error instanceof Error ? error.stack : '')}`);
    }
  }

  static async updateGenre(data: UpdateGenreDTO) {
    try {
      const res = await db.run('update genres set ${} where id = $1', [
        data.id,
      ]);
      if (res.rows.length === 0) {
        return null;
      }

      const genre = res.rows[0]

      assertGenreDTO(genre);

      return genre;
    } catch (error) {
      logger.error(`Failed to fetch genre: ${(error instanceof Error ? error.stack : '')}`);
    }
  }

  static async deleteGenre(id: number) {
    try {
      const res = await db.run('select * from genres where id = $1', [id]);
      if (res.rows.length === 0) {
        return null;
      }
      const genre = res.rows[0];
      assertGenreDTO(genre);
      return genre;
    } catch (error) {
      logger.error(`Failed to fetch genre: ${(error instanceof Error ? error.stack : '')}`);
    }
  }
}

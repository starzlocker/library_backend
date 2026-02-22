import { Genre } from '../models/Genre.js';
import { logger } from '../config/logger.js';
import { db } from '../config/database.js';

export class GenreRepository {
  static async getGenreByName(genreName: string) {
    try {
      const res = await db.run('select * from genres where name = $1', [
        genreName,
      ]);

      if (res.rows.length === 0) {
        return null;
      }

      return new Genre(res.rows[0]);
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      logger.error(`Erro ao buscar autor por nome: ${err}`);
    }
  }

  static async createGenre(data: Genre) {
    try {
      const genre = new Genre(data);
      const res = await db.run(
        'insert into genres (name) VALUES ($1) RETURNING *',
        [genre.name],
      );
      return new Genre(res.rows[0]);
    } catch (error) {
      logger.error(`Erro ao inserir autor: ${error.stack}`);
    } finally {
      client.release();
    }
  }
}

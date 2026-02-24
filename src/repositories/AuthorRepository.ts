import { Author } from '../models/Author.js';
import { logger } from '../config/logger.js';
import { db } from '../config/database.js';
import { assertAuthorDTO } from '../DTOs/Author/DBAuthorDTO.js';
import type { UpdateAuthorDTO } from '../DTOs/Author/UpdateAuthorDTO.js';
import type { CreateAuthorDTO } from '../DTOs/Author/CreateAuthorDTO.js';

export class AuthorRepository {
  static async getAuthorByName(authorName: string) {
    try {
      const res = await db.run('select * from authors where name ilike $1', [
        authorName,
      ]);

      const author = res.rows[0];
      assertAuthorDTO(author);
      return author;
    } catch (e) {
      logger.error(
        `Failed to fetch author: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async getAuthorById(id: number) {
    try {
      const res = await db.run('select * from authors where id = $1', [id]);
      if (res.rows.length === 0) {
        return null;
      }
      const author = res.rows[0];
      assertAuthorDTO(author);
      return author;
    } catch (e) {
      logger.error(
        `Failed to fetch author: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async createAuthor(data: CreateAuthorDTO) {
    try {
      const author = new Author(data);
      const res = await db.run(
        'insert into authors (name) VALUES ($1) RETURNING *',
        [author.name],
      );

      if (res.rows.length === 0) {
        throw new Error('Failed to insert author');
      }

      const dbAuthor = res.rows[0];

      assertAuthorDTO(dbAuthor);
      return dbAuthor;
    } catch (e) {
      logger.error(
        `Failed to insert author: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e;
    }
  }

  static async createAuthorIfDontExists(data: CreateAuthorDTO) {
    try {
      const author = new Author(data);
      const res = await db.run(`select * from authors where name ilike $1`, [
        author.name,
      ]);

      if (res.rows.length === 0) {
        return AuthorRepository.createAuthor(data);
      }

      const dbAuthor = res.rows[0];

      assertAuthorDTO(dbAuthor);
      return dbAuthor;
    } catch (e) {
      logger.error(
        `Failed to insert author: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e;
    }
  }

  static async updateAuthor(data: UpdateAuthorDTO) {
    try {
      const res = await db.run('update authors set ${} where id = $1 RETURNING *', [
        data.id,
      ]);

      const author = res.rows[0];

      assertAuthorDTO(author);

      return author;
    } catch (e) {
      logger.error(
        `Failed to fetch author: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }

  static async deleteAuthor(id: number) {
    try {
      const res = await db.run('select * from authors where id = $1 RETURNING *', [id]);

      const author = res.rows[0];
      assertAuthorDTO(author);
      return author;
    } catch (e) {
      logger.error(
        `Failed to fetch author: ${e instanceof Error ? e.stack : ''}`,
      );
      throw e
    }
  }
}

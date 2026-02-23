import { Author } from '../models/Author.js';
import { logger } from '../config/logger.js';
import { db } from '../config/database.js';
import { assertAuthorDTO } from '../DTOs/Author/DBAuthorDTO.js';
import type { UpdateAuthorDTO } from '../DTOs/Author/UpdateAuthorDTO.js';
import type { CreateAuthorDTO } from '../DTOs/Author/CreateAuthorDTO.js';

export class AuthorRepository {
  static async getAuthorByName(authorName: string) {
    try {
      const res = await db.run('select * from authors where name = $1', [
        authorName,
      ]);
      if (res.rows.length === 0) {
        return null;
      }
      const author = res.rows[0];
      assertAuthorDTO(author);
      return author;
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to fetch author: ${err}`);
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
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to fetch author: ${err}`);
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
        return null;
      }

      const book = res.rows[0];

      assertAuthorDTO(book);
      return book;
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);

      logger.error(`Failed to insert author: ${err}`);
    }
  }

  static async updateAuthor(data: UpdateAuthorDTO) {
    try {
      const res = await db.run('update authors set ${} where id = $1', [
        data.id,
      ]);
      if (res.rows.length === 0) {
        return null;
      }

      const author = res.rows[0];

      assertAuthorDTO(author);

      return author;
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to fetch author: ${err}`);
    }
  }

  static async deleteAuthor(id: number) {
    try {
      const res = await db.run('select * from authors where id = $1', [id]);
      if (res.rows.length === 0) {
        return null;
      }
      const author = res.rows[0];
      assertAuthorDTO(author);
      return author;
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to fetch author: ${err}`);
    }
  }
}

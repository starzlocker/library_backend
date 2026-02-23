import { db } from '../config/database.js';
import { assertDBBookDTO } from '../DTOs/Book/DBBookDTO.js';
import type { UpdateBookDTO } from '../DTOs/Book/UpdateBookDTO.js';
import type { GetBookDTO } from '../DTOs/Book/GetBookDTO.js';
import type { CreateBookDTO } from '../DTOs/Book/CreateBookDTO.js';

const INVALID_UPDATE_VALUES = 'There are no valid values for the update query';

export class BookRepository {
  static async getBooks(queryParams: GetBookDTO) {
    const { title, author, year, genre } = queryParams;
    const whereValues = [];
    const whereQuery = [];

    if (author || year || genre) {
      whereQuery.push('WHERE');

      if (year) {
        whereQuery.push(`year = $${whereValues.length + 1}`);
        whereValues.push(title);
      }

      if (author) {
        whereQuery.push(
          `a.name ilike '%' || $${whereValues.length + 1} || '%'`,
        );
        whereValues.push(title);
      }

      if (genre) {
        whereQuery.push(
          `g.name ilike '%' || $${whereValues.length + 1} || '%'`,
        );
        whereValues.push(title);
      }

      if (title) {
        whereQuery.push(`title ilike '%' || $${whereValues.length + 1} || '%'`);
        whereValues.push(title);
      }
    }
    let query = `select b.*, a.name as author, g.name as genre from books b INNER JOIN authors a on b.author_id = a.id INNER JOIN genres g on b.genre_id = g.id `;

    if (whereQuery.length) query += whereQuery.join(' and ');

    const res = await db.run(query, whereValues);

    if (res.rows.length === 0) {
      return null;
    }

    const books = res.rows.map((book) => {
      assertDBBookDTO(book);
      return book;
    });

    return books;
  }

  static async createBook(data: CreateBookDTO) {
    const res = await db.run(
      `
			INSERT INTO books (
				title, author_id, genre_id, year, 
				cover_url, description, price
			) VALUES (
				$1, 
				$2,
				$3,
				$4, 
				$5, 
				$6, 
				$7
			 )
			RETURNING *
		`,
      [
        data.title,
        data.author_id,
        data.genre_id,
        data.year,
        data.cover_url,
        data.description,
        data.price,
      ],
    );

    if (res.rows.length === 0) {
      return null;
    }

    const returnedBook = res.rows[0];
    assertDBBookDTO(returnedBook);

    return returnedBook;
  }

  static async getBookById(id: number) {
    const res = await db.run('SELECT * FROM books WHERE id = $1', [id]);
    const returnedBook = res.rows[0];
    assertDBBookDTO(returnedBook);
    return returnedBook;
  }

  static async updateBook(data: UpdateBookDTO) {
    const fields = [];
    const values = [];

    let i = 1;

    for (let key in data) {
      const typedKey = key as keyof UpdateBookDTO;
      fields.push(`${key}=$${i++}`);
      values.push(data[typedKey]);
    }

    if (!fields.length) {
      throw new Error(INVALID_UPDATE_VALUES);
    }

    const query =
      'UPDATE books SET ' + fields.join(', ') + ` WHERE id = $${i} RETURNING *`;

    values.push(data.id);

    const res = await db.run(query, values);
    if (res.rows.length === 0) {
      return null;
    }
    const dbBook = res.rows[0];

    assertDBBookDTO(dbBook);

    return dbBook;
  }

  static async deleteBook(id: number) {
    const res = await db.run('DELETE FROM books where id = $1', [id]);
    if (res.rows.length === 0) {
      return null;
    }
    const dbBook = res.rows[0];

    assertDBBookDTO(dbBook);
    return dbBook;
  }

  static isBooksOnTheTable() {
    return true;
  }
}

import { db } from '../config/database.js';
import { assertDBBookDTO } from '../DTOs/Book/DBBookDTO.js';
import type { GetBookDTO } from '../DTOs/Book/GetBookDTO.js';
import type { CreateBookDTO } from '../DTOs/Book/CreateBookDTO.js';
import { assertNumber, assertObject } from '../utils/TypeAssertions.js';
import { DBUpdateBookDTO } from '../DTOs/Book/DBUpdateBookDTO.js';

const INVALID_UPDATE_VALUES = 'There are no valid values for the update query';

export class BookRepository {
  static async getBooks(queryParams: GetBookDTO, page: number=1) {
    const { title, author, year, genre } = queryParams;
    const limit = 15;
    const whereValues = [];
    const whereQuery = [];

    if (title || author || year || genre) {
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
    let query = `
      select
        b.*, a.name as author,
        g.name as genre,
        COUNT(*) OVER() as total_rows
      from books b
      INNER JOIN authors a on b.author_id = a.id
      INNER JOIN genres g on b.genre_id = g.id
    `;
      
    if (whereQuery.length) query += "WHERE " + whereQuery.join(' and ');

    query += `order by id limit ${limit} OFFSET ${(page-1) * limit}`

    const res = await db.run(query, whereValues);
    
    if (res.rows.length === 0) {
      return {
        data: [],
        totalItems: 0,
      };
    }

    const totalItems = Number(res.rows[0].total_rows);

    const books = res.rows.map((book) => {
      assertDBBookDTO(book);
      return book;
    });

    return {
      data: books,
      totalItems
    };
  }

  static async createBook(data: CreateBookDTO) {
    const res = await db.run(
      `
			INSERT INTO books (
				title, 
        author_id, 
        genre_id, 
        year, 
				cover_url, 
        isbn,
        description, 
        price,
        stock
			) VALUES (
				$1, 
				$2,
				$3,
				$4, 
				$5, 
				$6, 
        $7,
        $8,
        $9
			 )
        ON CONFLICT (title) DO NOTHING
        RETURNING id
		`,
      [
        data.title,
        data.author_id,
        data.genre_id,
        data.year,
        data.cover_url,
        data.isbn,
        data.description,
        data.price,
        data.stock,
      ],
    );

    if (res.rows.length === 0) {
      return -1;
    }

    const createdId = res.rows[0].id;

    assertNumber(createdId);

    return createdId;
  }

  static async getBookById(id: number) {
    const res = await db.run('SELECT * FROM books WHERE id = $1', [id]);
    const returnedBook = res.rows[0];
    assertDBBookDTO(returnedBook);
    return returnedBook;
  }


  static async updateBook(id: number, data: DBUpdateBookDTO) {
    const fields = [];
    const values = [];

    let i = 1;

    for (let key in data) {
      const typedKey = key as keyof DBUpdateBookDTO;
      fields.push(`${key}=$${i++}`);
      values.push(data[typedKey]);
    }

    if (!fields.length) {
      throw new Error(INVALID_UPDATE_VALUES);
    }

    const query =
      'UPDATE books SET ' + fields.join(', ') + ` WHERE id = $${i} RETURNING id`;

    values.push(id);

    const res = await db.run(query, values);

    const updatedId = res.rows[0].id;

    assertNumber(updatedId);

    return updatedId;
  }

  static async deleteBook(id: number) {
    const res = await db.run('DELETE FROM books where id = $1 RETURNING id', [
      id,
    ]);

    const deletedId = res.rows[0].id;

    assertNumber(deletedId);
    return deletedId;
  }

  static async getTotalRows() {
    const totalRes = await db.run('select count(id) as total_items from books')

    let totalItems;
    if (totalRes.rows.length > 0) {
      const row = totalRes.rows[0]
      assertObject(row);
      if ('total_items' in row) totalItems = Number(row.total_items)
    } else {
      totalItems = 0
    }

    return totalItems;
  }
 
  static isBooksOnTheTable() {
    return true;
  }
}

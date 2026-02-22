import { db } from 'src/config/database.js';
import { GoogleBooks } from '../services/googleBookService.js'
import { BookModel } from '../models/Book.ts/index.js'
import { AuthorRepo } from './AuthorRepository.js';
import { GenreRepo } from './GenreRepository.js';
import { join } from 'path';
/**
 * @typedef {Object} Book
 * @property {number} [id]
 * @property {string} title
 * @property {number} author_id
 * @property {number} genre_id
 * @property {number} [year]
 * @property {string} [cover_url]
 * @property {string} [description]
 */

/*
[] join genre table if genre key has value
[] join author table if author key has value

olho os meus parametros
se eu tiver o nome do autor
preciso encontrar o id dele

para cada parametro
	é autor?
		ajusto o where para autor_id = (select id from authors where name == ${1})
*/

type getBooksParams = {
  title: string | undefined,
  author: string | undefined,
  year: string | undefined,
  genre: string | undefined
}

const buildQuery = (joins: string[]=[], queries: string[]=[]) => {
  let output = joins.length ? joins.join(' ') : ''

  if (queries.length) {
    output += ' WHERE ' + queries.join(' AND ');
  }

  return output;
}

export class BookRepository {
  static async getBooks(queryParams:getBooksParams) {
    const {title, author, year, genre} = queryParams;
    let query = 'SELECT * FROM books b ';
    const whereValues = [];
    const whereQuery = [];
    const joinQuery = [];

    if (author || year || genre) {
      whereQuery.push('WHERE');

      if (year) {
        whereQuery.push(`year = $${whereValues.length + 1}`);
        whereValues.push(title);
      } 

      if (author) {
        joinQuery.push('INNER JOIN authors a on b.author_id = a.id ');

        whereQuery.push(
          `a.name ilike '%' || $${whereValues.length + 1} || '%'`,
        );
        whereValues.push(title);
      } 
      
      if (genre) {
        joinQuery.push('INNER JOIN genres g on b.genre_id = g.id ');

        whereQuery.push(
          `g.name ilike '%' || $${whereValues.length + 1} || '%'`,
        );
        whereValues.push(title);
      } 

      if (title) {
        whereQuery.push(
          `title ilike '%' || $${whereValues.length + 1} || '%'`,
        );
        whereValues.push(title);
      }

    }
    if (joinQuery.length) query += joinQuery.join(' ');
    if (whereQuery.length) query += whereQuery.join(' and ');

    const res = await db.run(query, whereValues);

    const books = res.rows.map((book) => new BookModel(book));
    
    return books;
  }

  static async getBookInfoFromApi(title) {
    const google = new GoogleBooks();

    const bookInfo = await google.searchBookByTitle(title);
    const info = bookInfo?.volumeInfo;
    if (info) {
      return {
        cover_url:
          info?.imageLinks?.thumbnail || info?.imageLinks?.smallThumbnail || '',
        description: info?.description ? info.description : '',
        gender: info?.categories.length ? info.categories[0] : '',
        author: info?.authors.length ? info.authors[0] : '',
      };
    }
    return null;
  }

  static async createBook(data) {
    const book = new BookModel(data);
    const client = await dbConnect();
    const res = await client.query(
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
        book.title,
        book.authorId,
        book.genreId,
        book.year,
        book.coverUrl,
        book.description,
        book.price,
      ],
    );

    return new BookModel(res.rows[0]);
  }

  static async getBookById(id) {
    const client = await dbConnect();
    const res = await client.query('SELECT * FROM books WHERE id = $1', [id]);
    client.release();
    return new BookModel(res.rows[0]);
  }

  static async updateBook(data) {
    const client = await dbConnect();

    const fields = [];
    const values = [];
    const bookModel = new BookModel();
    const unallowedKeys = ['id', 'created_at', 'updated_at'];

    let i = 1;
    for (let k of Object.keys(bookModel)) {
      if (unallowedKeys.includes(k)) {
        continue;
      }
      if (data.hasOwnProperty(k)) {
        fields.push(`${k}=$${i++}`);
        values.push(data[k]);
      }
    }

    if (!fields.length) {
      throw new Error('Não existem valores válidos para o UPDATE.');
    }

    const query =
      'UPDATE books SET ' + fields.join(', ') + ` WHERE id = $${i} RETURNING *`;

    values.push(data.id);

    const res = await client.query(query, values);

    client.release();
    return new BookModel(res.rows[0]);
  }

  static async deleteBook(id) {
    const client = await dbConnect();
    const res = await client.query('DELETE FROM books where id = $1', [id]);
    client.release();
    return res;
  }

  static isBooksOnTheTable() {
    return true;
  }
}

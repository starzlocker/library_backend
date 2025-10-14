const {dbConnect} = require('../database/setup.js');
const {GoogleBooks} = require('../services/googleBookService.js');
const {BookModel} = require('../models/Book.js');
const {AuthorRepo} = require('../repositories/Author.js');
const {GenreRepo} = require('../repositories/Genre.js');
const { join } = require('path');
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

class Book{
	static async getBooks(queryParams)  {
		const client = await dbConnect();

		let query = [
			" FROM books b"
		] 
		const whereValues = []
		const whereQuery = []
		const joinQuery = []
		if (Object.keys(queryParams).length) {
			whereQuery.push("WHERE")

			for (let [k, v] of Object.entries(queryParams)) {
				if (v) {
					if (whereValues.length > 0) whereQuery.push("and")
					if (k == "year") {
						whereQuery.push(`${k} = $${whereValues.length+1}`);
						
					} else if (k == "author") {
						joinQuery.push("INNER JOIN authors a on b.author_id = a.id ")
						whereQuery.push(`a.name ilike '%' || $${whereValues.length+1} || '%'`);
					} else if (k == "genre") {
						joinQuery.push("INNER JOIN genres g on b.genre_id = g.id ")
						whereQuery.push(`g.name ilike '%' || $${whereValues.length+1} || '%'`);				
					} else {
						whereQuery.push(`title ilike '%' || $${whereValues.length+1} || '%'`);		
					}
					whereValues.push(v)
				}
			}

			if (joinQuery.length) query.push(...joinQuery);
			if (whereQuery.length) query.push(...whereQuery);
		}

		const res = await client.query(query.join(" "), whereValues)
		client.release();
		const books = res.rows.map(book => new BookModel(book));
		return books;
	}

	static async getBookInfoFromApi(title) {
		const google = new GoogleBooks();

		const bookInfo = await google.searchBookByTitle(title);
		const info = bookInfo?.volumeInfo
		if (info) {
			return {
				cover_url: info?.imageLinks?.thumbnail || info?.imageLinks?.smallThumbnail || "",
				description: info?.description ? info.description : "",
				gender: info?.categories.length ? info.categories[0] : "",
				author: info?.authors.length ? info.authors[0] : ""
			}
		}
		return null;

	}

	static async createBook(data) {
		const book = new BookModel(data);
		const client = await dbConnect();
		const res = await client.query(`
			INSERT INTO books (
				title, author_id, genre_id, year, 
				cover_url, description, price
			) VALUES ($1, $2, $3, $4, $5, $6, $7)
			RETURNING *
		`, [
			book.title,
			book.author_id,
			book.genre_id,
			book.year,
			book.cover_url,
			book.description,
			book.price
		]);

		return new BookModel(res.rows[0]);
	}

	
	static async getBookByTitle (title)  {
		const client = await dbConnect();
		const res = await client.query("SELECT * FROM books WHERE title ILIKE $1", [`%${title}%`]);
		client.release();
		return res.rows;
	}
	
	static async updateBook(book)  {
		const client = await dbConnect();
		const res = await client.query("UPDATE books SET author_id=$1, genre_id=$2, year=$3, cover_url=$4, description=$5 WHERE title ILIKE $6", [book.author_id, book.genre_id, book.year, book.cover_url, book.description, `%${book.title}%`]);
	
		client.release();
		return res;
	}
	
	static async deleteBook(book_name)  {
		const client = await dbConnect();
		await client.query("DELETE FROM books where title ILIKE $1", [`%${book_name}%`]);
		client.release();
	}
	
	static isBooksOnTheTable () {
		return true;
	}
}

module.exports = { Book }
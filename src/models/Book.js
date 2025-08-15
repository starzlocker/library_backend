const {dbConnect} = require('../database/setup.js')

class Book{
	static async getBooks()  {
		const client = await dbConnect();
		const res = await client.query(`
				SELECT
				*
				FROM books;
			`)
		client.release()
		return res.rows;
	}
	 POKUFIDIDU 
	 
	static async getBookByTitle (title)  {
		const client = await dbConnect();
		const res = await client.query("SELECT * FROM books WHERE title ILIKE $1", [`%${title}%`]);
		client.release();
		return res.rows;
	}
	
	static async updateBook(book)  {
		const client = await dbConnect();
		const res = await client.query("UPDATE books SET author_id=$1, genre_id=$2, year=$3, cover_url=$4, description=$5 WHERE title ILIKE $6", [book.author_id, book.genre_id, book.year, book.cover_url, book.description, `%${book.title}%`])
	
		client.release();
		return res;
	}
	
	static async deleteBook(book_name)  {
		const client = await dbConnect();
		await client.query("DELETE FROM books where title ILIKE $1", [`%${book_name}%`])
		client.release();
	}
	
	static isBooksOnTheTable () {
		return true;
	}
}

module.exports = { Book }
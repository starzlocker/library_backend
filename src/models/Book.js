const {dbConnect} = require('../database/setup.js')

const getBooks = async () => {
	const client = await dbConnect();
	const res = await client.query(`
			SELECT
			*
			FROM books;
		`)
	client.release()
	return res.rows;
}

const getBookByTitle = async (title) => {
	const client = await dbConnect();
	const res = await client.query("SELECT * FROM books WHERE title ILIKE $1", [`%${title}%`]);
	client.release();
	return res.rows;
}

const updateBook = async (book) => {
	const client = await dbConnect();
	const res = await client.query("UPDATE books SET author_id=$1, genre_id=$2, year=$3, cover_url=$4, description=$5", [book.author_id, book.genre_id, book.year, book.cover_url, book.description])

	client.release();
	return res;
}

const deleteBook = async(book_name) => {
	const client = await dbConnect();
	await client.query("DELETE FROM books where title ILIKE $1", [`%${book_name}%`])
	client.release();
}

const isBooksOnTheTable = ()=> {
	return true;
}

// getBookByTitle('the lord of the rings').then(b => console.log(b))

updateBook({
	title: 'The Lord of the Rings 2',
	author_id: 10,
	genre_id: 10,
	year: 1954,
	cover_url: 'teste',
	description: 'Conta a história sobre o dono de uma joalheria que vendia anéis de noivado.'
}).then(b => console.log(b))

module.exports = { getBooks }
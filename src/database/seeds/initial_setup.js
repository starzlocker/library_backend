const {dbConnect} = require('../setup')

const insertDefaultBooks = async (client, data) => {
	try {
		for (let book of data) {
			const authorResult = await client.query("SELECT id FROM authors WHERE name = $1", [book.author]);
			const genreResult = await client.query("SELECT id FROM genres WHERE name = $1", [book.genre]);
			
			if (authorResult.rows.length === 0) {
				console.error(`Author not found: ${book.author}`);
				continue;
			}
			if (genreResult.rows.length === 0) {
				console.error(`Genre not found: ${book.genre}`);
				continue;
			}
			
			const author_id = authorResult.rows[0].id;
			const genre_id = genreResult.rows[0].id;
			
			await client.query(`
				INSERT INTO books(title, year, author_id, genre_id) values($1,$2,$3,$4) ON CONFLICT (title) DO NOTHING
			`, [book.title, book.year, author_id, genre_id])
		}
	} catch (e) {
		console.error(e);
	}
}

const insertDefaultAuthors = async (client, data) => {
	try {
		console.log(data)
		for (let book of data) {
			await client.query(`
				INSERT INTO authors(name) values($1) ON CONFLICT (name) DO NOTHING
			`, [book.author])
		}
	} catch (e) {
		console.error(e)
	}
}


const insertDefaultGenres = async (client, data) => {
	try {
		for (let book of data) {
			await client.query(`
				INSERT INTO genres(name) values($1) ON CONFLICT (name) DO NOTHING
			`, [book.genre])
		}
	} catch (e) {
		console.error(e)
	}
}

const seedDatabase = async (data) => {
	const client = await dbConnect();
	try {
		await client.query("BEGIN");
		await insertDefaultAuthors(client, data);
		await insertDefaultGenres(client, data);
		await insertDefaultBooks(client, data);
		await client.query("COMMIT");
	} catch (e) {
		await client.query('ROLLBACK');
		console.error(e);
	} finally {
		client.release()
	}
}




const books = [{
      "title": "1984",
      "author": "George Orwell",
      "year": "1949",
      "genre": "Dystopian",
      "cover": "1984.jpg"
  },
  {
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": "1960",
      "genre": "Fiction",
      "cover": "to_kill_a_mockingbird.jpg"
  },
  {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": "1925",
      "genre": "Tragedy",
      "cover": "the_great_gatsby.jpg"
  },
  {
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year": "1813",
      "genre": "Romance",
      "cover": "pride_and_prejudice.jpg"
  },
  {
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "year": "1951",
      "genre": "Fiction",
      "cover": "the_catcher_in_the_rye.jpg"
  },
  {
      "title": "Moby Dick",
      "author": "Herman Melville",
      "year": "1851",
      "genre": "Adventure",
      "cover": "moby_dick.jpg"
  },
  {
      "title": "Brave New World",
      "author": "Aldous Huxley",
      "year": "1932",
      "genre": "Dystopian",
      "cover": "brave_new_world.jpg"
  },
  {
      "title": "War and Peace",
      "author": "Leo Tolstoy",
      "year": "1869",
      "genre": "Historical Fiction",
      "cover": "war_and_peace.jpg"
  },
  {
      "title": "Crime and Punishment",
      "author": "Fyodor Dostoevsky",
      "year": "1866",
      "genre": "Psychological Fiction",
      "cover": "crime_and_punishment.jpg"
  },
  {
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "year": "1937",
      "genre": "Fantasy",
      "cover": "the_hobbit.jpg"
  },
  {
      "title": "Fahrenheit 451",
      "author": "Ray Bradbury",
      "year": "1953",
      "genre": "Dystopian",
      "cover": "fahrenheit_451.jpg"
  },
  {
      "title": "The Lord of the Rings",
      "author": "J.R.R. Tolkien",
      "year": "1954",
      "genre": "Fantasy",
      "cover": "the_lord_of_the_rings.jpg"
  }
]

seedDatabase(books)
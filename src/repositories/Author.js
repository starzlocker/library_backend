const {dbConnect} = require('../database/setup.js')
const {AuthorModel} = require('../models/Author.js')

class Author {	
	static async getAuthorByName(authorName) {
		const client = await dbConnect();
		try {
			const res = await client.query("select * from authors where name = $1", [authorName]);

			if (res.rows.length === 0) {
				return null;
			}

			return new AuthorModel(res.rows[0]);
		} catch (error) {
			console.error(`Erro ao buscar autor por nome: ${error}`);
		} finally {
			client.release();
		}
	}

	static async createAuthor(data) {
		const client = await dbConnect();
		try {
			const author = new AuthorModel(data);
			const res = await client.query("insert into authors (name) VALUES ($1) RETURNING *", [author.name]);
			return new AuthorModel(res.rows[0]);
		} catch (error) {
			console.error(`Erro ao inserir autor: ${error}`)
		} finally {
			client.release()
		}
	}
}

module.exports = {Author}
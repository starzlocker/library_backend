const {dbConnect} = require('../database/setup.js')
const {GenreModel} = require('../models/Genre.js')

class Genre {	
	static async getGenreByName(genreName) {
		const client = await dbConnect();
		try {
			const res = await client.query("select * from genres where name = $1", [genreName]);
			
			if (res.rows.length === 0) {
				return null;
			}

			return new GenreModel(res.rows[0]);
		} catch (error) {
			console.error(`Erro ao buscar autor por nome: ${error}`);
		} finally {
			client.release();
		}
	}

	static async createGenre(data) {
		const client = await dbConnect();
		try {
			const genre = new GenreModel(data);
			const res = await client.query("insert into genres (name) VALUES ($1) RETURNING *", [genre.name]);
			return new GenreModel(res.rows[0]);
		} catch (error) {
			console.error(`Erro ao inserir autor: ${error}`)
		} finally {
			client.release()
		}
	}
}

module.exports = {Genre}
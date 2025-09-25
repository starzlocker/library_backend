const {dbConnect} = require('../database/setup.js')
const {UserModel} = require('../models/User.js')

class User {
	static async createUser(
		name,
		last_name,
		email,
		password,
	) {

		const userInput = new UserModel(
			name,
			last_name,
			email,
			password,
			"user"
		);

		try {
			userInput.validate();
		} catch (error) {
			throw Error(` Erro ao validar novo usuário: ${error}`);
		}
		try {
			const client = await dbConnect();
			const res = await client.query(
				"insert into users (name, last_name, email, password, role) values ($1, $2, $3, $4, $5) returning (id, name, last_name, email, password, role)", [
					userInput.name,
					userInput.last_name,
					userInput.email,
					userInput.password,
					userInput.role
				]
			);
			if (res.rows.length === 0) {
				throw new Error("Não cadastrou o usuário");
			}
			const user = new UserModel(res.rows[0])

			return user.id;
		} catch (error) {
			console.error(`Erro ao criar novo usuário: ${error}`);
			return null;
		}
	}

	static async getUserByEmail(email) {
		const client = await dbConnect();

		const res = await client.query("select * from users where email = $1", [email]);

		if (res.rows.length === 0) {
			throw new Error("Não existe nenhum usuário com esse email");
		}

		return res.rows[0];
	}

	static async deleteUser(data) {
		const client = await dbConnect();
		if (data?.id) {
			const res = await client.query("delete * from users where id = $1 returning *", data.id);

			if (res.rows.length === 0) {
				throw new Error('Não existe usuário com o ID selecionado')
			}

			return new UserModel(res.rows[0]);
		}
	}

	static async updateUser(data) {
		const client = await dbConnect();
		if (data?.id) {
			const query = "";
			for (let [k, v] of Object.entries(data)) {
				query.push($`{k} = ${v}`);
			}
			if (query.length === 0) {
				throw new Error('Não há valores para atualizar');
			}

			query.join(',');

			const res = await client.query($`update users set ${query} where id = $1 returning *`, id);

			if (res.rows.length === 0) {
				throw new Error('Não foi possível atualizar o usuário.');
			}

			return new UserModel(res.rows[0]);
		}
	}

	
}


module.exports = {User};
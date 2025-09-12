const {dbConnect} = require('../config/database');
const {UserModel} = require('../models/User.js')

class User {
	static async createUser(data) {
		const user = new UserModel(data);
		try {
			user.validate();
		} catch (error) {
			throw Error(` Erro ao validar novo usuário: ${error}`);
		}

		try {
			const client = await dbConnect();
	
			const res = await client.query(
				"insert into users (name, email, password)values ($1 $2 $3) returning (id, name, email)", [
					user.name,
					user.email,
					user.password
				]
			);

			const user = new UserModel(res.rows[0])

			return user;
		} catch (error) {
			console.error(`Erro ao criar novo usuário: ${error}`);
		}
	}

	static async getUserByEmailAndPassword(data) {
		const {email, password} = data;

		const client = await dbConnect();

		const res = await client.query("select * from users where email = $1", email);

		if (res.rows.length === 0) {
			throw new Error("Não existe nenhum usuário com esse email");
		}
		const user = new UserModel(res.rows[0])
		const validPassword = validatePassword(password, user.password);

		if (validPassword) {
			return user;
		}

		throw new Error("A senha não corresponde à esse usuário.")
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

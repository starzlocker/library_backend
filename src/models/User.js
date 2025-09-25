VALID_ROWS = ['user', 'admin'];

class UserModel {
	constructor(name, last_name, email, password, role) {
		this.id = null;
		this.role = role;
		this.name = name,
		this.last_name = last_name,
		this.email = email;
		this.password = password;
		this.created_at = null;
		this.updated_at = null;
	}

	validate() {
		if (!this.name || typeof(this.name) !== 'string' || !this.name.trim()) {
			throw new Error('Nome do usuário não foi fornecido.');
		}

		if (!this.last_name || typeof(this.last_name) !== 'string' || !this.last_name.trim()) {
			throw new Error('Sobrenome do usuário não foi fornecido.');
		}

		if (!this.password || typeof(this.password) !== 'string' || !this.password.trim()) {
			throw new Error('Senha inválida');
		}

		if ((!this.role || typeof(this.role) !== 'string') || !this.role.trim() || !VALID_ROWS.includes(this.role)) {
			throw new Error(`Role inválida, deve ser uma entre ${VALID_ROWS.join(",")}`);
		}
		
		if (!this.email || typeof(this.email) !== 'string' || !this.email.trim()) {
			throw new Error('Email do usuário não foi fornecido.');
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(this.email)) {
			throw new Error('Email do usuário é inválido.');
		}

		return true;
	}
}

module.exports = { UserModel };
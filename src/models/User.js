class UserModel {
	constructor(name, email, id=null) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = null;
	}

	validate() {
		if (!this.name || typeof(this.name) !== 'string' || !this.name.trim()) {
			throw new Error('Nome do usuário não foi fornecido.');
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
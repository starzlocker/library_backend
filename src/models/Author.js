class AuthorModel {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.createdAt = data.created_at;
		this.updatedAt = data.updated_at;
	}
}

module.exports = {AuthorModel}
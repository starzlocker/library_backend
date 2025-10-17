class GenreModel {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.createdAt = data.created_at || null;
		this.updatedAt = data.updated_at || null;
	}
}

module.exports = {GenreModel}
class BookModel {
    constructor(data={}) {
        this.id = data["id"] || null;
        this.title = data["title"] || "";
        this.author_id = data["author_id"] === "" ? null : (data["author_id"] || null);
        this.genre_id = data["genre_id"] === "" ? null : (data["genre_id"] || null);
        this.year = data["year"] === "" ? null : (data["year"] || null);
        this.cover_url = data["cover_url"] || "";
        this.description = data["description"] || "";
        this.stock = data["stock"] === "" ? 0 : (data["stock"] || 0);
        this.price = data["price"] === "" ? 0 : (data["price"] || 0);
        this.createdAt = data.created_at || null;
        this.updatedAt = data.updated_at || null;
    }

    validate() {
        if (!this.author_id || typeof(this.author_id) != 'string' || !this.author_id.trim()) {
            throw new Error('Nome do autor não foi fornecido.');
        }

        if (!this.genre_id || typeof(this.genre_id) != 'string' || !this.genre_id.trim()) {
            throw new Error('Gênero do livro não foi fornecido.');
        }

        if (!this.title || typeof(this.title) != 'string' || !this.title.trim()) {
            throw new Error('Título do livro não foi fornecido.');
        }

        if (this.year && (typeof(this.year) != 'number' || this.year < 0)) {
            throw new Error('Ano do livro deve ser um número positivo.');
        }

        if (this.cover_url && typeof(this.cover_url) != 'string') {
            throw new Error('URL da capa deve ser uma string.');
        }

        if (this.description && typeof(this.description) != 'string') {
            throw new Error('Descrição do livro deve ser uma string.');
        }
    }
}

module.exports = { BookModel }
class GoogleBooks {
	constructor() {
		this.url = `https://www.googleapis.com/books/v1/volumes`
	}

	async searchBookByTitle(title) {
		const query = `intitle:${encodeURIComponent(title)}&maxResults=1`;
		const url = `${this.url}?q=${query}`;
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Resposta do servidor: ${res.status}`);
		}

		const data = await res.json();

		return data?.items;
	}
}

module.exports = { GoogleBooks }
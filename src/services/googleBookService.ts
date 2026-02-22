export class GoogleBooks {
  url: string

	constructor() {
		this.url = `https://www.googleapis.com/books/v1/volumes`
	}

	async searchBookByTitle(title:string) {
		const query = `intitle:${encodeURIComponent(title)}&maxResults=1`;
		const url = `${this.url}?q=${query}`;
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Resposta do servidor: ${res.status}`);
		}

		const data = await res.json();

    if(data && typeof data === 'object' && 'items' in data && Array.isArray(data.items) && data.items.length > 0) {
      return data.items[0];
    }

	}
}
export type BookInfo = {
  description: string | null,
  price: number | null,
  coverUrl: string | null
}

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

  async getBookInfo(title: string): Promise<BookInfo> {
    const info = await this.searchBookByTitle(title);

    let description;
    let coverUrl;
    let price;
    
    if (info?.volumeInfo) {
      const volumeInfo = info.volumeInfo;
      
      description = volumeInfo.description || null;
      if (volumeInfo?.imageLinks) {
        coverUrl = volumeInfo.imageLinks?.thumbnail || null;
      }
    }

    if (info?.saleInfo) {
      price = info?.saleInfo?.listPrice?.amount || 0;
    }

    return {
      description,
      coverUrl,
      price
    }
  }
}


export class Genre {
  id: string
  name: string
  createdAt: string | null
  updatedAt: string | null

	constructor(data:unknown) {
    this.isGenre(data);
		this.id = data.id;
		this.name = data.name;
		this.createdAt = data.createdAt || null;
		this.updatedAt = data.updatedAt || null;
	}

  private isGenre(data:unknown): asserts data is Genre {
    if (!data || typeof data !== 'object') {
      throw TypeError('Expected data of type object')
    }

    if (!('id' in data) || typeof data.id !== 'string') {
      throw TypeError('Expected required property [id]')
    }

    if (!('name' in data) || typeof data.id !== 'string') {
      throw TypeError('Expected required property [name]')
    }

    if (!('createdAt' in data) || typeof data.id !== 'string') {
      throw TypeError('Expected required property [createdAt]')
    }

    if (!('updatedAt' in data) || typeof data.id !== 'string') {
      throw TypeError('Expected required property [updatedAt]')
    }
  }
}


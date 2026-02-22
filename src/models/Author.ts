export class Author {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: unknown) {
    this.isAuthor(data);
    this.id = data.id;
    this.name = data.name;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }

  private isAuthor(data:unknown): asserts data is Author {
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

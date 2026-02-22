import { isString, isNumber } from '../utils/TypeAssertions.js'

export class Book {
  id: number;
  title: string;
  authorId: number;
  genreId: number;
  year: string;
  coverUrl: string;
  description: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data:unknown) {
    this.isBook(data);
    this.id = data.id;
    this.title = data.title;
    this.authorId = data.authorId;
    this.genreId = data.genreId;
    this.year = data.year;
    this.coverUrl = data.coverUrl;
    this.description = data.description;
    this.stock = data.stock;
    this.price = data.price;
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  private isBook(data: unknown): asserts data is Book {
    if (!data || typeof data !== 'object') {
      throw TypeError('Expected data of type object')
    }
    if (!('id' in data)) {
      throw TypeError('Expected required property [id]')
    }
    if (!('title' in data)) {
      throw TypeError('Expected required property [title]')
    }
    if (!('authorId' in data)) {
      throw new TypeError('Expected required property [authorId]')
    }
    if (!('genreId' in data)) {
      throw new TypeError('Expected required property [genreId]')
    }
    if (!('year' in data)) {
      throw new TypeError('Expected required property [year]')
    }
    if (!('coverUrl' in data)) {
      throw new TypeError('Expected required property [coverUrl]')
    }
    if (!('description' in data)) {
      throw new TypeError('Expected required property [description]')
    }
    if (!('stock' in data)) {
      throw new TypeError('Expected required property [stock]')
    }
    if (!('price' in data)) {
      throw new TypeError('Expected required property [price]')
    }
    if (!('createdAt' in data)) {
      throw new TypeError('Expected required property [createdAt]')
    }
    if (!('updatedAt' in data)) {
      throw new TypeError('Expected required property [updatedAt]')
    }

    isNumber(data.id)
    isString(data.title)
    isNumber(data.authorId)
    isNumber(data.genreId)
    isString(data.year)
    isString(data.coverUrl)
    isString(data.description)
    isNumber(data.stock)
    isNumber(data.price)
    isString(data.createdAt)
    isString(data.updatedAt)
  }

  validate() {
    if (
      !this.authorId ||
      typeof this.authorId !== 'string' ||
      !this.authorId.trim()
    ) {
      throw new Error('Nome do autor não foi fornecido.');
    }

    if (
      !this.genreId ||
      typeof this.genreId != 'string' ||
      !this.genreId.trim()
    ) {
      throw new Error('Gênero do livro não foi fornecido.');
    }

    if (!this.title || typeof this.title != 'string' || !this.title.trim()) {
      throw new Error('Título do livro não foi fornecido.');
    }

    if (this.year && (typeof this.year != 'number' || this.year < 0)) {
      throw new Error('Ano do livro deve ser um número positivo.');
    }

    if (this.coverUrl && typeof this.coverUrl != 'string') {
      throw new Error('URL da capa deve ser uma string.');
    }

    if (this.description && typeof this.description != 'string') {
      throw new Error('Descrição do livro deve ser uma string.');
    }
  }
}

module.exports = { BookModel: Book };

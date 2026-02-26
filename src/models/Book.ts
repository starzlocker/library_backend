import {
  assertString,
  assertNumber,
  assertObject,
  assertDate,
  assertNonEmptyString,
  isNonNullable,
} from '../utils/TypeAssertions.js';

export function assertBookSchema(data: unknown): asserts data is BookSchema {
  assertObject(data);
  assertNumber(data.id);
  assertNonEmptyString(data.title);
  assertNumber(data.authorId);
  assertNumber(data.genreId);
  assertNumber(data.year);
  assertString(data.description);
  assertNumber(data.stock);
  assertNumber(data.price);
  assertDate(data.createdAt);
  assertDate(data.updatedAt);
  if (isNonNullable(data.coverUrl)) assertString(data.coverUrl);
  if (isNonNullable(data.isbn)) assertString(data.isbn);
}

export type BookSchema = { 
  id: number;
  title: string;
  authorId: number;
  author: string;
  genre: string;
  genreId: number;
  year: number;
  coverUrl: string | null;
  description: string;
  stock: number;
  price: number;
  isbn: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Book {
  id: number | null = null;
  title: string | null = null;
  authorId: number | null = null;
  author: string | null = null;
  genre: string | null = null;
  genreId: number | null = null;
  year: number | null = null;
  coverUrl: string | null = null;
  isbn: string | null = null;
  description: string | null = null;
  stock: number | null = null;
  price: number | null = null;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;

  constructor(data:unknown=null) {
    if(data !== null) {
      assertBookSchema(data);
      this.id = data.id;
      this.title = data.title;
      this.authorId = data.authorId;
      this.author = data.author;
      this.genreId = data.genreId;
      this.genre = data.genre;
      this.year = data.year;
      this.coverUrl = data.coverUrl || null;
      this.isbn = data.isbn || null;
      this.description = data.description;
      this.stock = data.stock;
      this.price = data.price;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }

  validate() {
    if (!this.authorId) {
      throw new Error('Required author id');
    }
    if (!this.genreId) {
      throw new Error('Required genre id');
    }

    if (!this.title || !this.title.trim()) {
      throw new Error('Required book title');
    }

    if (this.year && this.year < 0) {
      throw new Error('Invalid published year');
    }
  }
}

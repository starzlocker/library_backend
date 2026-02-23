import {
  assertString,
  assertNumber,
  assertObject,
  assertDate,
  assertNonEmptyString,
  isNonNullable,
} from '../utils/TypeAssertions.js';

export function assertBookType(data: unknown): asserts data is Book {
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
}
export class Book {
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
  createdAt: Date;
  updatedAt: Date;

  constructor(data: unknown) {
    assertBookType(data);
    this.id = data.id;
    this.title = data.title;
    this.authorId = data.authorId;
    this.author = data.author;
    this.genreId = data.genreId;
    this.genre = data.genre;
    this.year = data.year;
    this.coverUrl = data.coverUrl || null;
    this.description = data.description;
    this.stock = data.stock;
    this.price = data.price;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  validate() {
    if (!this.authorId) {
      throw new Error('Required author id');
    }
    if (!this.genreId) {
      throw new Error('Required genre id');
    }

    if (!this.title.trim()) {
      throw new Error('Required book title');
    }

    if (this.year < 0) {
      throw new Error('Invalid published year');
    }
  }
}

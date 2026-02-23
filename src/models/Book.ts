import {
  assertString,
  assertNumber,
  assertObject,
  assertDate,
  assertNonEmptyString,
} from '../utils/TypeAssertions.js';

function isBook(data: unknown): asserts data is Book {
  assertObject(data);
  if (data.id) assertNumber(data.id);
  assertNonEmptyString(data.title);
  if (data.authorId) assertNumber(data.authorId);
  if (data.genreId) assertNumber(data.genreId);
  assertNumber(data.year);
  if (data.coverUrl) assertString(data.coverUrl);
  assertString(data.description);
  if (data.stock) assertNumber(data.stock);
  assertNumber(data.price);
  if (data.createdAt) assertDate(data.createdAt);
  if (data.updatedAt) assertDate(data.updatedAt);
}
export class Book {
  id: number | null;
  title: string;
  authorId: number | null;
  genreId: number | null;
  year: number;
  coverUrl: string | null;
  description: string;
  stock: number | null;
  price: number;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(data: unknown) {
    isBook(data);
    this.id = data.id || null;
    this.title = data.title;
    this.authorId = data.authorId || null;
    this.genreId = data.genreId || null;
    this.year = data.year;
    this.coverUrl = data.coverUrl || null;
    this.description = data.description;
    this.stock = data.stock;
    this.price = data.price;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
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

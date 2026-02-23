import {
  isString,
  isNumber,
  isObject,
  isInstanceOfDate,
  isNonEmptyString,
} from '../utils/TypeAssertions.js';

function isBook(data: unknown): asserts data is Book {
  isObject(data);
  if (data.id) isNumber(data.id);
  isNonEmptyString(data.title);
  if (data.authorId) isNumber(data.authorId);
  if (data.genreId) isNumber(data.genreId);
  isNumber(data.year);
  if (data.coverUrl) isString(data.coverUrl);
  isString(data.description);
  if (data.stock) isNumber(data.stock);
  isNumber(data.price);
  if (data.createdAt) isInstanceOfDate(data.createdAt);
  if (data.updatedAt) isInstanceOfDate(data.updatedAt);
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

import type { DBAuthorDTO } from '../DTOs/Author/DBAuthorDTO.js';
import { DBBookDTO } from '../DTOs/Book/DBBookDTO.js';
import type { DBUpdateBookDTO } from '../DTOs/Book/DBUpdateBookDTO.js';
import { UpdateBookDTO } from '../DTOs/Book/UpdateBookDTO.js';
import type { DBGenreDTO } from '../DTOs/Genre/DBGenreDTO.js';
import type { Author } from '../models/Author.js';
import { Book } from '../models/Book.js';
import type { Genre } from '../models/Genre.js';
import Currency from './currency.js';

export const mapDBBookDTOasBook = (data: DBBookDTO) => {
  return new Book({
    id: data.id,
    title: data.title,
    authorId: data.author_id,
    genreId: data.genre_id,
    genre: data.genre,
    author: data.author,
    year: data.year,
    coverUrl: data.cover_url,
    description: data.description,
    stock: data.stock,
    price: data.price ? Currency.fromString(data.price) : data.price,
    isbn: data.isbn,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
};

export const mapBookUpdateDTOtoDB = (data: UpdateBookDTO): DBUpdateBookDTO => ({
  title: data.title,
  author_id: data.authorId,
  genre_id: data.genreId,
  year: data.year,
  cover_url: data.coverUrl,
  description: data.description,
  stock: data.stock,
  price: Currency.toString(data.price),
  isbn: data.isbn,
});

export const mapDBGenreDTOasGenre = (data: DBGenreDTO): Genre => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const mapDBAuthorDTOasAuthor = (data: DBAuthorDTO): Author => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

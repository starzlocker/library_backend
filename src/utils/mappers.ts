import type { DBAuthorDTO } from '../DTOs/Author/DBAuthorDTO.js';
import type { DBBookDTO } from '../DTOs/Book/DBBookDTO.js';
import type { DBGenreDTO } from '../DTOs/Genre/DBGenreDTO.js';
import type { Author } from '../models/Author.js';
import { Book } from '../models/Book.js';
import type { Genre } from '../models/Genre.js';
import * as Currency from './currency.js';

export const DBBookDTOasBook = (data: DBBookDTO) => {
  return new Book({
    id: data.id,
    title: data.title,
    authorId: data.author_id,
    genreId: data.genre_id,
    year: data.year,
    coverUrl: data.cover_url,
    description: data.description,
    stock: data.stock,
    price: data.price ? Currency.fromString(data.price) : data.price,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
};

export const DBGenreDTOasGenre = (data: DBGenreDTO): Genre => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const DBAuthorDTOasAuthor = (data: DBAuthorDTO): Author => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

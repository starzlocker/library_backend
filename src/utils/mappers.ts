import type { BookDTO } from '../DTOs/Book/BookDTO.js';
import type { DBGenreDTO } from '../DTOs/Genre/DBGenreDTO.js';
import { Book } from '../models/Book.js';
import type { Genre } from '../models/Genre.js';

export const bookDTOasBook = (data: BookDTO) => {
  return new Book({
    id: data.id,
    title: data.title,
    authorId: data.author_id,
    genreId: data.genre_id,
    year: data.year,
    coverUrl: data.cover_url,
    description: data.description,
    stock: data.stock,
    price: data.price,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
};

export const bookAsBookDTO = (data: Book) => {
  return {
    id: data.id,
    title: data.title,
    author_id: data.authorId,
    genre_id: data.genreId,
    year: data.year,
    cover_url: data.coverUrl,
    description: data.description,
    stock: data.stock,
    price: data.price,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
  } as BookDTO;
};

export const DBGenreDTOasGenre = (data: DBGenreDTO): Genre => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};
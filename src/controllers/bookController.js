const {Book} = require('../repositories/Book')
const {Author} = require('../repositories/Author')
const {BookModel} = require('../models/Book')
const {Genre} = require('../repositories/Genre')
const {GoogleBooks} = require('../services/googleBookService')
const {logger} = require("../config/logger");
const { validationResult } = require('express-validator')

const getBooks = async (req, res) => {
    try {
        const {
            title,
            author,
            year
        } = req.query;

        const queryParams = {}
        if (title) queryParams["title"] = title;
        if (author) queryParams["author"] = author;
        if (year) queryParams["year"] = year;
        
        const books = await Book.getBooks(queryParams)

        if (!books.length) {
            return res.status(404).json( {
                message: 'Nenhum livro encontrado.'
            })
        }

        res.json({
            success: true,
            data: books
        })
    } catch (e) {
        logger.error(`Erro ao buscar livros: ${e.stack}`)
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

const getBookById = async (req, res) => {
    try {
        const data = req.params.id;
        if (!data || typeof(data) != 'string') {
            res.status(400).json({
                message: 'Requisição inválida, o id do título não foi fornecido.'
            })
        }
        const book = await Book.getBookById(data);

        if (!book) {
            res.status(404).json({
                message: `Livro ${data} não encontrado.`
            })
        }

        res.status(200).json({
            success: true,
            data: book
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = req.body;

        data.id = req.params.id;
        if (!data.id || typeof(data.id) != 'string') {
            res.status(400).json({
                message: 'Requisição inválida, o id do livro não foi fornecido.'
            })
        }

        if (!data || typeof(data) != 'object') {
            res.status(400).json({
                message: 'Requisição inválida, o objeto do livro é inválido.'
            })
        }
        const book = await Book.updateBook(data);

        if (!book) {
            res.status(404).json({
                message: `Livro não encontrado.`
            })
        }

        res.status(200).json({
            success: true,
            data: book
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        if (!id || typeof(id) != 'string') {
            res.status(400).json({
                message: 'Requisição inválida, o id do livro não foi fornecido.'
            })
        }

        const book = await Book.deleteBook(id);

        if (!book) {
            res.status(404).json({
                message: `Livro não encontrado.`
            })
        }

        res.status(200).json({
            success: true,
            data: book
        })

    } catch (e) {
        logger.error(`Erro ao deletar livro: ${e.stack}`);
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

const createBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const data = req.body;

        const mandatoryFields = [
            "title",
            "author",
            "genre",
            "year"
        ]

        const missingFields = [];

        const dataKeys = Object.keys(data);

        for (let k of mandatoryFields) {
            if (!dataKeys.includes(k)) {
                missingFields.push(k);
            }
        }

        if (missingFields.length) {
            return res.status(400).json({
                message: `Dados imcompletos: ${missingFields.length > 1 ? 
                    missingFields.join(", ") + " estão ausentes e são obrigatórios." :
                    missingFields[0] + " está ausente e é obrigatório."
                }`
            });
        }

        if (!data || typeof(data) != 'object') {
            return res.status(400).json({
                message: 'Dados do livro inválidos.'
            });
        }

        if (!data.author || typeof(data.author) != 'string' || !data.author.trim()) {
            return res.status(400).json({
                message: 'Nome do autor não foi fornecido.'
            });
        }

        if (!data.genre || typeof(data.genre) != 'string' || !data.genre.trim()) {
            throw new Error('Gênero do livro não foi fornecido.');
        }

        const author_db = await Author.getAuthorByName(data.author);
        const genre_db = await Genre.getGenreByName(data.genre);

        data.author_id = author_db?.id || null;
        data.genre_id = genre_db?.id || null;
        
        const google = new GoogleBooks();

        const book = new BookModel(data);

        const bookInfo = await google.searchBookByTitle(book.title);

        if (bookInfo?.volumeInfo) {
            const volumeInfo = bookInfo.volumeInfo;
            book.description = volumeInfo.description;
            if (volumeInfo?.imageLinks) {
                book.cover_url = volumeInfo.imageLinks?.thumbnail;
            }
        }

        if (bookInfo?.saleInfo) {
            book.price = bookInfo?.saleInfo?.listPrice?.amount || 0.0;
        }

        const createdBook = await Book.createBook(book);
        res.json({
            success: true,
            data: createdBook
        })
    } catch (error) {
        logger.error(`Erro ao criar livro: ${error.stack}`);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { getBookById: getBookById, getBooks, updateBook, deleteBook, createBook }
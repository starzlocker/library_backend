const {Book} = require('../repositories/Book')
const {Author} = require('../repositories/Author')
const {BookModel} = require('../models/Book')
const {Genre} = require('../repositories/Genre')
const {GoogleBooks} = require('../services/googleBookService')

const getBooks = async (req, res) => {
    try {
        const books = await Book.getBooks()

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
        console.error(`Erro ao buscar livros: ${e}`)
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

const getBookByTitle = async (req, res) => {
    try {
        const data = req.body;
        if (!data?.book_title || typeof(data.book_title) != 'string') {
            res.status(400).json({
                message: 'Requisição inválida, o título do livro não foi fornecido.'
            })
        }
        const book = await Book.getBookByTitle(data.book_title);

        if (!book) {
            res.status(404).json({
                message: `Livro ${data.book_title} não encontrado.`
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
        const data = req.body;
        if (!data?.book || typeof(data.book) != 'object') {
            res.status(400).json({
                message: 'Requisição inválida, o objeto do livro é inválido.'
            })
        }
        const book = await Book.updateBook(data.book);

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
        const data = req.body;
        if (!data?.book || typeof(data.book) != 'object') {
            res.status(400).json({
                message: 'Requisição inválida, o objeto do livro é inválido.'
            })
        }
        const book = await Book.deleteBook(data.book);

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
        console.error(`Erro ao deletar livro: ${e}`);
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

const createBook = async (req, res) => {
    try {
        const data = req.body;

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

        data.author = author_db?.id;
        data.genre_id = genre_db?.id;
        
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
        console.error(`Erro ao criar livro: ${error}`);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { getBookByTitle, getBooks, updateBook, deleteBook, createBook }
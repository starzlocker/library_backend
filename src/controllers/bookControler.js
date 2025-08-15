const {Book} = require('../repositories/Book')

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
        const data = req.data;
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
        const data = req.data;
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
        res.statuts(500).json({
            success: false,
            error: e.message
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const data = req.data;
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
        res.statuts(500).json({
            success: false,
            error: e.message
        })
    }
}

const createBook = async () => {
    if (!(book && typeof(book) == 'object') && book?.title) {

    }

    const google = new GoogleBooks();

    const bookInfo = await google.searchBookByTitle(book.title);

    if (bookInfo?.volumeInfo) {
        const volumeInfo = bookInfo.volumeInfo;
        book.descricao = volumeInfo.description;
        if (volumeInfo?.imageLinks) {
            book.cover_url = volumeInfo.imageLinks?.thumbnail;
        }
    }

    if (bookInfo?.saleInfo) {
        book.price = bookInfo?.listPrice?.amount || 0.0;
    }
}

module.exports = { getBookByTitle, getBooks, updateBook, deleteBook }
const express = require('express')

const router = express.Router();

const bookRoutes = require('./routes/bookRoutes');

router.use('/books', bookRoutes);

const app = express();

app.use(express.json());

app.use('/api', router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`)
})
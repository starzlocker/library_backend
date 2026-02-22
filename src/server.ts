import cors from 'cors';
import path from 'node:path';
import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import express from 'express';

const PORT = process.env.PORT;
const URL = process.env.CLIENT_URL;

const router = express.Router();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

router.use('/auth', authRoutes);

router.use('/books', bookRoutes);

const app = express();

app.use(express.json());
app.use(cors({
	origin: URL
}));

app.use('/api', router)


app.listen(PORT, () => {
    console.log(`Servidor rodando em ${URL}:${PORT}`)
})

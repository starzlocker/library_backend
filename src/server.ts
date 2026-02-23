import cors from 'cors';
import path from 'node:path';
import { env } from 'node:process';
import express from 'express';

const PORT = env.PORT;
const URL = env.CLIENT_URL;

const router = express.Router();

const bookRoutes = require('./routes/bookRoutes');

router.use('/books', bookRoutes);

const app = express();

app.use(express.json());
app.use(cors({
	origin: URL
}));

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server running in ${URL}:${PORT}`)
})

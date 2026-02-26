import cors from 'cors';
import { env } from 'node:process';
import express from 'express';
import bookRoutes from './routes/bookRoutes.js'

const PORT = env.PORT;
const FRONTEND = env.CLIENT_URL;

const router = express.Router();

router.use('/books', bookRoutes);

const app = express();

app.use(express.json());
app.use(cors({
	origin: FRONTEND
}));

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

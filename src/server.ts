import cors from 'cors';
import { env } from 'node:process';
import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import { logger } from './config/logger.js';
import { authRoutes } from './routes/authRoutes.js';

const PORT = env.PORT;
const FRONTEND = env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND,
  }),
);
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  logger.info('frontend on ' + FRONTEND);
  console.log('teste');
});

const cors = require('cors')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');

const router = express.Router();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

router.use('/auth', authRoutes);

router.use('/books', bookRoutes);

const app = express();

app.use(express.json());
app.use(cors({
	origin: 'http://localhost:5173'
}));
app.use('/api', router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://204.216.151.254:${PORT}`)
})

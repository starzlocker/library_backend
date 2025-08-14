require('dotenv').config()

const connect = async () => {
    if (global.connection) {
        return global.connection.connect()
    }

    const { Pool } = require('pg');
    
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();

    console.log('Criou a pool de conexões');

    const res = await client.query("SELECT NOW()");

    console.log(res.rows[0]);

    client.release();

    global.connection = pool;
    return pool.connect()
}


const getBooks = async () => {
    const client = await connect();
    const res = client.query(`
            SELECT
            *
            FROM Books;
        `)
    return res.rows;
}

module.exports = { getBooks }


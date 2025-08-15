const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log('🔍 Setup Debug:');
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING);

const dbConnect = async () => {
    if (global.connection) {
        return global.connection.connect()
    }

    const { Pool } = require('pg');
    
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    global.connection = pool;
    return pool.connect()
}

console.log('Oi')

dbConnect()

module.exports = { dbConnect }

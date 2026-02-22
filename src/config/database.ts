import { Pool } from 'pg';
import { env } from 'node:process';

export const pool = new Pool({
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  max: Number(env.MAX_DB_POOLSIZE),
  connectionTimeoutMillis: 2_000,
  idleTimeoutMillis: 30_000
})

export const db = {
  run: async(query:string, params?: any[]) => {
    const res = await pool.query(query, params);
    return res;
  }
}

console.log(db.run('select * from authors'))
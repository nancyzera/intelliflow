import pkg from 'pg';
const { Pool } = pkg;

let pool;

export async function initDb() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending',
      created_by INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS insights (
      id SERIAL PRIMARY KEY,
      source_type TEXT NOT NULL,
      summary TEXT,
      ai_tags JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export function getDb() {
  if (!pool) throw new Error('DB not initialized');
  return pool;
}



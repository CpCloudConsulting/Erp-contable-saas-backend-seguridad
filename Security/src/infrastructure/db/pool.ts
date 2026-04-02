import { Pool } from 'pg';

let pool: Pool;

export function getPool() {
  if (!pool) {

    if (!process.env.DB_PASS) {
      throw new Error("DB_PASS no definido");
    }

    pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 5432,
      ssl: { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function setTenantSchema(schema: string) {
  if (!/^[a-zA-Z0-9_]+$/.test(schema)) {
    throw new Error("Schema inválido");
  }
  const pool = getPool();
  await pool.query(`SET search_path TO "${schema}"`);
}
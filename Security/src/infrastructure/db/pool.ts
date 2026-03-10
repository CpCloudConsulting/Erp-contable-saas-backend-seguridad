import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432
});

export async function setTenantSchema(schema: string) {
  if (!/^[a-zA-Z0-9_]+$/.test(schema)) {
    throw new Error("Schema inválido");
  }

  await pool.query(`SET search_path TO ${schema}`);
}
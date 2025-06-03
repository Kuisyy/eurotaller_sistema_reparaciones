import pgp from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const cn = {
  host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
  port: process.env.PGPORT || process.env.DB_PORT || 5432,
  database: process.env.PGDATABASE || process.env.DB_NAME || 'eurotaller',
  user: process.env.PGUSER || process.env.DB_USER || 'postgres',
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD || 'luis123',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Añadir estas opciones para IPv6
  options: `-c search_path=public`,
  // Forzar IPv4
  family: 4
};

const db = pgp()(process.env.DATABASE_URL || cn);

export default db;
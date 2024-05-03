import pg from 'pg';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from './config.js';

// Cria uma nova instância do cliente PostgreSQL
const db = new pg.Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Conecta-se ao banco de dados PostgreSQL
db.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao banco de dados PostgreSQL:', err));

export { db };

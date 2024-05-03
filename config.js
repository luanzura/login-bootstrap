// Este arquivo é responsável por carregar as variáveis de ambiente a partir do arquivo .env
// Para configurar o sistema, edite o arquivo .env correspondente e não este arquivo diretamente.

import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const TOKEN_LENGTH = process.env.TOKEN_LENGTH;
export const SALT_ROUNDS = process.env.SALT_ROUNDS;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;

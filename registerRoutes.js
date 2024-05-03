import express from "express";
import { db } from "./database.js";
import { TOKEN_LENGTH, SALT_ROUNDS } from './config.js';
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = Number(SALT_ROUNDS);

// Função para gerar um token aleatório
function generateToken(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }

  return token;
}

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Verificar se o email já está em uso
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      console.log("Email já está em uso:", email);
      return res.status(400).send("Este email já está em uso.");
    } else {
      // Se o email não está em uso, prosseguir com o registro
      const token = generateToken(TOKEN_LENGTH);
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Erro no hash", err);
        } else {
          const insertQuery = 'INSERT INTO users (first_name, second_name, email, password, token) VALUES ($1, $2, $3, $4, $5)';
          await db.query(insertQuery, [first_name, last_name, email, hash, token]);
          console.log("Usuário registrado com sucesso:", email);
          res.send("Registro bem-sucedido!");
        }
      });
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send("Erro ao processar o registro do usuário.");
  }
});

export { router as registerRoutes };

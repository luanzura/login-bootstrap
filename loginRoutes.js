import express from "express";
import { db } from "./database.js";
import { SALT_ROUNDS } from './config.js';
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = Number(SALT_ROUNDS);

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se email existe
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      const hashePassword = user.password;

      // Verifica se a senha é igual ao hash do email
      bcrypt.compare(password, hashePassword, (err, result) => {
        if (err) {
          console.log("Erro na comparação das senhas", err);
        } else {
          if (result) {
            res.send("Login efetuado com sucesso.")
          } else {
            res.send("Senha incorreta.");
          }
        }
      });
    } else {
      res.send("Email não encontrado.")
    }
    } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao processar o login do usuário.");
  }
});

export { router as loginRoutes };

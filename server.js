import express from "express";
import bodyParser from "body-parser";
import { loginRoutes } from "./loginRoutes.js";
import { registerRoutes } from "./registerRoutes.js";
import { PORT } from './config.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuração das rotas
app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Importa rotas de login e registro
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor online em http://localhost:${PORT}`);
});

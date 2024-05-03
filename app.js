import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

  const fName = req.body.firstName
  const lName = req.body.lastName
  const email = req.body.email;
  const password =req.body.password;

  try {
    // Verificar se o email já está em uso
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      console.log("Email já está em uso:", email);
      return res.status(400).send("Este email já está em uso.");
    } else {

    // Se o email não está em uso, prosseguir com o registro
    const insertQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    await db.query(insertQuery, [email, password]);
    console.log("Usuário registrado com sucesso:", email);
    res.send("Registro bem-sucedido!");
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send("Erro ao processar o registro do usuário.");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password =req.body.password;
  try {
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      const storedPassword = user.password;
      if (password === storedPassword){
        res.send("Login efetuado com sucesso.")
      } else {
        res.send("Senha incorreta.");
      }
    } else {
      res.send("Email não encontrado.")
    }
    
  } catch (error) {
    console.log(error);
  }
}); 

app.listen(port, () => {
  console.log(`Servidor online em  http://localhost:${port}`)
})

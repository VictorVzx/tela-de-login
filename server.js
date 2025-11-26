require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
});

// Rota de registro
app.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const hash = await bcrypt.hash(senha, 10);

  try {
    await pool.query(
      "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, hash]
    );
    res.json({ message: "Usuário registrado!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Email já existe" });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length === 0) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(senha, user.senha);

  if (!match) {
    return res.status(400).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({
    message: "Logado!",
    token,
    nome: user.nome
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

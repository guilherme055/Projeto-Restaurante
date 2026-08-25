const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (site)
app.use(express.static(path.join(__dirname, '..')));

let users = [
  {
    email: 'admin@paralanches.com',
    senha: '123456',
    nome: 'Administrador'
  }
];

let pratos = [];

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

app.post('/api/login', (req, res) => {
  const { email, senha } = req.body || {};
  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  const user = users.find(u => u.email === email && u.senha === senha);

  if (user) {
    return res.json({ ok: true, message: `Bem-vindo, ${user.nome}!`, user: { email: user.email, nome: user.nome } });
  }

  return res.status(401).json({ error: 'E-mail ou senha inválidos' });
});

// Endpoint para listar usuários
app.get('/api/users', (req, res) => {
  const safeUsers = users.map(u => ({ nome: u.nome, email: u.email }));
  res.json(safeUsers);
});

// Endpoint para adicionar usuário
app.post('/api/users', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }

  users.push({ nome, email, senha });
  res.status(201).json({ ok: true, message: 'Usuário criado com sucesso' });
});

// Endpoint para listar pratos
app.get('/api/pratos', (req, res) => {
  res.json(pratos);
});

// Endpoint para adicionar prato
app.post('/api/pratos', (req, res) => {
  const { nome, descricao, preco, img } = req.body;
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const novoPrato = { id: Date.now(), nome, descricao, preco, img };
  pratos.push(novoPrato);
  res.status(201).json({ ok: true, message: 'Prato adicionado com sucesso', prato: novoPrato });
});

module.exports = app;

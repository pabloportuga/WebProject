const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios."
    });
  }
  console.log(req.body);

  res.status(201).json({
    message: "Usuário recebido com sucesso!"
  });
});
module.exports = app;

const pool = require("../database/connection");
const bcrypt = require("bcrypt");

function validarEmail(email) {
  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padrao.test(email);
}

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    // teste para valores nulos ou em branco
    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        message: "Os valores não podem ser nulos ou em branco!"
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "A senha deve conter mais de 8 caracteres!"
      });
    }
    if (!validarEmail(email)) {
      return res.status(400).json({
        message: "E-mail inválido!"
      });
    }
    if (username.length < 3 || username.length > 16) {
      return res.status(400).json({
        message: "Usuário inválido!"
      });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const valores = [username, email, passwordHash];
    await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)', valores);

    return res.status(201).json({
      message: "Usuário criado com sucesso!"
    });
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Nome de usuário ou e-mail já cadastrado!"
      });
    }
    return res.status(500).json({
      message: "Um erro aconteceu!"
    });
  }

}

module.exports = {
  createUser
}

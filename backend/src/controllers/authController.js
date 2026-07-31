const pool = require("../database/connection")
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        message: "Os valores não podem ser nulos ou em branco!"
      });
    }

    const resultado = await pool.query('SELECT id, username, password_hash FROM users WHERE username = $1', [username]);
    if (resultado.rows.length === 0) {
      return res.status(401).json({
        message: "Usuário não cadastrado!"
      });
    }
    const passwordHash = resultado.rows[0].password_hash;
    const match = await bcrypt.compare(password, passwordHash);
    if (!match) {
      return res.status(401).json({
        message: "Senha incorreta!"
      });
    }
    return res.status(200).json({
      message: "Login ocorreu com sucesso!"
    });
    // Criar token
    // Retornar token

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Um erro aconteceu!"
    });
  }
}

module.exports = {
  login
}

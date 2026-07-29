const pool = require("../database/connection")
const bcrypt = require("bcrypt");
async function createUser(req, res) {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;
    // teste para valores nulos ou em branco
    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        message: "Os valores não podem ser nulos ou em branco!"
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

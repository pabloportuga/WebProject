const pool = require("../database/connection")
async function createUser(req, res) {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;
    const valores = [username, email, password]
    // teste para valores nulos ou em branco
    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: "Os valores não podem ser nulos ou em branco!" });
    } else {
      await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)', valores)
      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Um erro aconteceu!" });
  }

}
module.exports = {
  createUser
}

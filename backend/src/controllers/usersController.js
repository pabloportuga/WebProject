const pool = require("../database/connection")
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const valores = [username, email, password]
    console.log(req.body)
    await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)', valores)

    res.status(201).json({ message: "Usuário criado com sucesso!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Um erro aconteceu!" });
  }

}
module.exports = {
  createUser
}

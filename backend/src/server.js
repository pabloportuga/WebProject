const app = require("./app");
const PORT = 3000;
const pool = require("./database/connection.js")

async function testarConexao() {
  try {
    const test = await pool.query('SELECT NOW()')
    console.log(test.rows);
    console.log("Conectado ao PostgreSQL!");
  }
  catch (err) {
    console.error("Erro ao conectar ao PostgreSQL!", err);
    process.exit(1)
  }
}

async function main() {
  await testarConexao();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
main();

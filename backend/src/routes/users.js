//importar o express
const express = require("express");
// criar um router
const router = express.Router();
// definir POST /users
router.post('/', (req, res) => {
  res.send('Usuário criado com sucesso');
});
// exportar esse router
module.exports = router;
// importar o controller
// chamar createUser
//

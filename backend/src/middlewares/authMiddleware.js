const jwt = require("jsonwebtoken")
require('dotenv').config();

async function validarToken(req, res, next) {
  try {
    const authHeader = req.header("authorization");
    if (!authHeader) {
      return res.status(401).json({
        message: "Acesso negado!"
      });
    }
    const partes = authHeader.split(" ");

    if (partes.length !== 2) {
      return res.status(401).json({
        message: "Header com mais ou menos de duas partes!"
        //mudar em produção para Authorization header inválido
      });
    }
    const [bearer, token] = partes;
    if (bearer !== "Bearer") {
      return res.status(401).json({
        message: "Bearer não encontrado!"
        //mudar em produção para Authorization header inválido
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Token inválido ou expirado!"
    });
  }
}
module.exports = {
  validarToken
};

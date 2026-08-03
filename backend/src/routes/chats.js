const express = require("express");
const router = express.Router();
const chatsController = require("../controllers/chatsController");
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/private',
  authMiddleware.validarToken,
  chatsController.createPrivateChat
);
router.get("/",
  authMiddleware.validarToken,
  chatsController.getChats
);

module.exports = router;

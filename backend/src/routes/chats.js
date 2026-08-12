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

router.get("/:id/messages",
  authMiddleware.validarToken,
  chatsController.getMessages
);

router.post('/:id/messages',
  authMiddleware.validarToken,
  chatsController.sendMessage
);

router.patch('/messages/:id',
  authMiddleware.validarToken,
  chatsController.editMessage
);
module.exports = router;

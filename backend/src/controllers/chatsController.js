const pool = require("../database/connection");

async function createPrivateChat(req, res) {
  try {
     const creatorId = req.user.id;
     const { receiverId } = req.body;

    if (!receiverId) {
       return res.status(400).json({
         message: "receiverId é obrigatório."
       });
    }
    if (creatorId === receiverId) {
       return res.status(400).json({
         message: "Você não pode criar um chat com você mesmo."
       });
    }

    const resultado = await pool.query('SELECT id FROM users WHERE id = $1', [receiverId]);

    if (resultado.rows.length === 0) {
       return res.status(404).json({
         message: "Usuário não encontrado!"
       });
    }
    const consulta = await pool.query('SELECT chats.id, chat_participants.user_id FROM chats JOIN chat_participants ON chats.id = chat_participants.chat_id');

        // verificar se já existe chat

        // criar chat

        // adicionar participantes

        // retornar sucesso

  } catch (error) {
     console.error(error);

     return res.status(500).json({
       message: "Um erro aconteceu!"
     });
  }
}

module.exports = {
  createPrivateChat
}

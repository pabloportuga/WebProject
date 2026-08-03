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
    const consulta = await pool.query(
      `
        SELECT chats.id
        FROM chats
        JOIN chat_participants
          ON chats.id = chat_participants.chat_id
        WHERE chats.type = 'private'
          AND chat_participants.user_id IN ($1, $2)
        GROUP BY chats.id
        HAVING COUNT(chat_participants.user_id) = 2
      `,
      [creatorId, receiverId]
    );
    if (consulta.rows.length > 0) {
      return res.status(409).json({
        message: "Esse chat privado já existe!"
      })
    }
    const resultadoId = await pool.query(
      `
      INSERT INTO chats(type, name, created_by)
      VALUES($1, $2, $3)
      RETURNING id`,
      ['private', null, creatorId]
    );
    const chatId = resultadoId.rows[0].id;
    await pool.query(
      `
      INSERT INTO chat_participants(chat_id, user_id)
      VALUES ($1, $2),
      ($1, $3)
      `,
      [chatId, creatorId, receiverId]
    );
    console.log(consulta);
    return res.status(200).json({
      message: "Chat criado com sucesso!",
      chatId
    });
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

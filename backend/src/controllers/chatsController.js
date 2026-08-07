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

    const usuario = await pool.query('SELECT id FROM users WHERE id = $1', [receiverId]);

    if (usuario.rows.length === 0) {
       return res.status(404).json({
         message: "Usuário não encontrado!"
       });
    }
    const chatExistente = await pool.query(
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
    if (chatExistente.rows.length > 0) {
      return res.status(409).json({
        message: "Esse chat privado já existe!"
      })
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const novoChat = await client.query(
        `
        INSERT INTO chats(type, name, created_by)
        VALUES($1, $2, $3)
        RETURNING id`,
        ['private', null, creatorId]
      );
      const chatId = novoChat.rows[0].id;
      await client.query(
        `
        INSERT INTO chat_participants(chat_id, user_id)
        VALUES ($1, $2),
        ($1, $3)
        `,
        [chatId, creatorId, receiverId]
      );

      await client.query("COMMIT");

      return res.status(201).json({
        message: "Chat criado com sucesso!",
        chatId
      });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
      return res.status(500).json({
        message: "Um erro aconteceu!"
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
       message: error.message
    });
  }
}

async function getChats(req, res) {
  try {
    const userId = req.user.id;
    const chats = await pool.query(`
      SELECT chats.id, chats.type, chats.name
      FROM chats
      JOIN chat_participants
      ON chats.id = chat_participants.chat_id
      WHERE chat_participants.user_id = $1
      `,
      [userId]);
    return res.json(chats.rows);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
       message: error.message
    });
  }
}

async function getMessages(req, res) {
  try {
    const userId = req.user.id;
    const chatId = Number(req.params.id);
    if (Number.isNaN(chatId)) {
      return res.status(400).json({
        message: "Chat inválido."
      });
    }
    const participantes = await pool.query(`
      SELECT 1
      FROM chat_participants
      WHERE chat_id = $1
      AND user_id = $2
      `,
      [chatId, userId]
    );
    if (participantes.rows.length === 0) {
      return res.status(403).json({
        message: "Você não tem acesso a este chat!"
      });
    }

    const mensagens = await pool.query(
      `
      SELECT id, sender_id, content, created_at, edited_at
      FROM messages
      WHERE chat_id = $1
      AND deleted_at IS NULL
      ORDER BY created_at ASC;
      `,
      [chatId]
    );
    return res.status(200).json(mensagens.rows);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message
    });
  }
}
module.exports = {
  createPrivateChat,
  getChats,
  getMessages
}

# WebProject

### Funcionalidades do MVP:
1. Login e Criação de conta
2. Chat Público
3. Chat Privado
4. Chat em grupo
5. Perfil

Tecnologias: HTML, CSS, JavaScript, PostgreSQL 
---
### Pastas:
- Frontend:
1. Pages: login.html, register.html, home.html, profile.html, chat.html
- Backend:
- Banco de dados:
---
Entidades do banco: 
- User: idUser, name, email, passwordHash, avatar, createdAt
- Chat: idChat, type (public, private, group)
- Message: idMessage, content, idUser, idChat, createdAt
- ParticipantChat: idUser, idChat
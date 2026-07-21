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
- Users: id(INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY), username(VARCHAR(16)NOT NULL UNIQUE), email(VARCHAR(64)NOT NULL UNIQUE), password_hash(VARCHAR(255)), avatar_url(TEXT NULL), created_at(TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
- Chats: id(INT), type (public, private, group)
- Messages: id(INT), content(TEXT), user_id, chat_id, created_at
- Chat_participants: user_id, chat_id

Comandos:
docker compose up -d

docker exec -it chat-postgres psql -U postgres -d chatapp

CREATE TABLE users( 
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
username VARCHAR(16) NOT NULL UNIQUE, 
email VARCHAR(64) NOT NULL UNIQUE, 
password_hash VARCHAR(255) NOT NULL, 
avatar_url TEXT, 
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
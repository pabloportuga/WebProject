# WebProject

### Funcionalidades do MVP:
1. Login e Criação de conta
2. Chat Público
3. Chat Privado
4. Chat em grupo
5. Perfil

Comandos:
docker compose up -d
node src/server.js

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"username":"Pablo","email":"pablo@gmail.com","password":"123456789"}'

curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"Pablo","password":"123456789"}'

curl -X POST http://localhost:3000/chats/private \
-H "Authorization: Bearer SEU_TOKEN" \
-H "Content-Type: application/json" \
-d '{"receiverId": 7}'

docker exec -it chat-postgres psql -U postgres -d chatapp

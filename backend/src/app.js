const express = require("express");
const app = express();

const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const chatsRoutes = require("./routes/chats");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/chats", chatsRoutes);


module.exports = app;

const express = require("express");
const app = express();

const usersRoutes = require("./routes/users")

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", usersRoutes)

module.exports = app;

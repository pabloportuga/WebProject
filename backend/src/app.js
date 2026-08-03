const express = require("express");
const app = express();

const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);


module.exports = app;

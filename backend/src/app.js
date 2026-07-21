const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});
module.exports = app;

app.use(express.json());
app.post("/users", (req, res) => {

});

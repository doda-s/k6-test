const express = require("express");
const app = express();

app.use(express.static("frontend")); // onde está seu index.html

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
const express = require("express");
const app = express();

app.use(express.static("frontend")); // onde está seu index.html

app.listen(3000, () => {
  console.log("Frontend server adress - http://127.0.0.1:3000");
});
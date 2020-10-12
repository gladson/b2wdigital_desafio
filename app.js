require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const con = mongoose.connection;

con.on("open", () => {
  console.log("MongoDB conectado...");
});

// SERVER - PORT
const port = process.env.PORT || 9000;
const host = process.env.HOST || "http://localhost";

app.listen(port, () => {
  console.log(`Servidor rodando => ${host}:${port}`);
});

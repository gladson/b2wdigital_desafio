require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
    .connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {
        console.log(
            "Por favor efetue a configuração correta do arquivo .env..."
        );
        server.close(function () {
            process.exit(1);
        });
    });

const con = mongoose.connection;

con.on("open", () => {
    console.log("MongoDB conectado...");
});

// ROUTE
const apiPrefix = process.env.API_PREFIX || "/api/v1";

app.use(apiPrefix + "/planets", require("./src/routers/planet"));

// SERVER - PORT
const port = process.env.PORT || 9000;
const host = process.env.HOST || "http://localhost";

app.listen(port, () => {
    console.log(`Servidor rodando => ${host}:${port}`);
});

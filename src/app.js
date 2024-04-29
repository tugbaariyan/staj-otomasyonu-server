const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

// Express uygulamasını oluşturun
const app = express();

// .env config
require("dotenv").config();

// Middleware'leri kullanın
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB'ye bağlan
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB bağlantı hatası:"));
db.once("open", () => {
  console.log("DB bağlantısı başarılı...");
});

app.listen(process.env.PORT, () => {
  console.log(`Proje ayağa kalktı. Port: ${process.env.PORT}`);
  app.use("/user", routes.routeUser);
  app.use("/document", routes.routeDocument);
  app.get("/", (req, res) => {
    res.send("Staj otomasyon sistemine hoş geldiniz!");
  });
});

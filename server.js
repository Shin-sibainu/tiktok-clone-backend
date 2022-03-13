const express = require("express");
const mongoose = require("mongoose");
//app config
const app = express();
const PORT = 8000;
const data = require("./data.js");
const videos = require("./models.js");

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "* "),
    res.setHeader("Access-Control-Allow-Headers", "* "),
    next();
});

//dbconfig
const MONGO_URL =
  "mongodb+srv://shincode:abc@cluster1.rikev.mongodb.net/tiktok?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected DB..."))
  .catch((err) => console.log(err));

//api endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

//ダミーデータ用
app.get("/v1/posts", (req, res) => {
  res.status(200).send(data);
});

app.get("/v2/posts", (req, res) => {
  videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//dbにデータを追加
app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(PORT || process.env.PORT, () => console.log("server running"));

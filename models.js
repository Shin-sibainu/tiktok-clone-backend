const mongoose = require("mongoose");

const tiktokShema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  favorite: String,
  messages: String,
  description: String,
  shares: String,
});

module.exports = mongoose.model("tiktokVideos", tiktokShema);

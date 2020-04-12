const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model("item", itemSchema);

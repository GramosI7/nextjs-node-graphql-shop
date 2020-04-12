import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

export default mongoose.model("item", itemSchema);

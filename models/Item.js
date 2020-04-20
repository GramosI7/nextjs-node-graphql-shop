import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: [
    {
      public_id: String,
      url: String,
      created_at: String,
    },
  ],
  genre: String,
});

export default mongoose.model("item", itemSchema);

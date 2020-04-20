import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  createdAt: String,
});

export default mongoose.model("user", userSchema);

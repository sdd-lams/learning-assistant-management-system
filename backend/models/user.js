const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
//   id: Number,
  email: String,
  role: String
});

module.exports = mongoose.model("User", userSchema, "users");

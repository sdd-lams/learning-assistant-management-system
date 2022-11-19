const mongoose = require("mongoose");
const { Schema } = mongoose;

const laSchema = new Schema({
//   id: Number,
  name: String,
  dorm: String,
  room: String,
  email: String,
  officeHours: String,
});

module.exports = mongoose.model("La", laSchema, "las");

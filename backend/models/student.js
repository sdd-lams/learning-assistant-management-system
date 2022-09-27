const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  fname: String,
  lname: String,
  dorm: String,
  room: String,
  status: String,
  rin: Number
});

module.exports = mongoose.model("Student", studentSchema, "students");

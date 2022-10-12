const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  fname: String,
  lname: String,
  dorm: String,
  room: String,
  status: String,
  rin: Number,
  email: String,
  cname: String,
  ccode: String,
  cprof: String,
  concern: String,
  la: String,
  ewsdate: Date,
  ewscount: Number,
  profcomment: String,
  lacomment: String,
  emailcnt: Number,
});

module.exports = mongoose.model("Student", studentSchema, "students");

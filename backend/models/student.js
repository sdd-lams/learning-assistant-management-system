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
  csubject: String,
  cprof: String,
  ewsreason: String,
  assignedla: String,
  ewsdate: Date,
  ewscount: Number,
  profcomment: String,
  lacomment: String,
  emailcount: Number,
});

module.exports = mongoose.model("Student", studentSchema, "students");

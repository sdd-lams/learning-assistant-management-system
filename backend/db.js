const mongoose = require("mongoose");

// DB connection stuff
mongoose.connect(
  "mongodb+srv://lams-adim:adminpassword123@lams-cluster0.cywatwl.mongodb.net/lams?retryWrites=true&w=majority"
);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

module.exports = database;
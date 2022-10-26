const User = require("../models/user");
const express = require("express");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const data = await User.find({  });

    console.log("Returned all the Users");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error getting Users: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

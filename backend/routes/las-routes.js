const La = require("../models/la");
const express = require("express");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const data = await La.find({  });

    console.log("Returned all the Las");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error getting Las: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
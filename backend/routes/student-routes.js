const Student = require("../models/student");
const express = require("express");
const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find({  });

    console.log("Returned all the Students");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error getting Students: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:rin/:ccode", async (req, res) => {
  // Check to see if Student exists
  try {
    const exists = await Student.exists({
      rin: req.params.rin,
      ccode: req.params.ccode
    });

    // If it exists, attempt to return it
    if (exists) {
      try {
        const data = await Student.findOne({
          rin: req.params.rin,
          ccode: req.params.ccode,
        });
        console.log("Returned the Student: " + data.fname + " " + data.lname);
        res.status(200).json(data);
      } catch (error) {
        console.log("Could not get Student: " + error.message);
        res.status(500).json({ message: error.message });
      }
    }
    // If it doesn't exist, return a 404
    else {
      console.log("Student does not exist");
      res.status(404).json({ message: "Student does not exist" });
    }
  } catch (error) {
    console.log("Could not check Student in GET: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

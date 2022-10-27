const User = require("../models/user");
const express = require("express");
const router = express.Router();

// Get one User
router.get("/", async (req, res) => {
  // Check to see if User exists
  try {
    const exists = await User.exists({
      email: req.query.email
    });
    // If it exists, attempt to return it
    if (exists) {
      try {
        const data = await User.findOne({
          email: req.query.email
        });

        console.log(`Returned the User with email ${data.email}`);

        res.status(200).json(data);
      } catch (error) {
        console.log("Could not get User: " + error.message);
        res.status(500).json({ message: error.message });
      }
    }
    // If it doesn't exist, return a 404
    else {
      console.log("User does not exist");
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.log("Could not check User in GET: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create new User
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
        email: req.body.email,
        role: req.body.role ? req.body.role : null
    });

    res.status(200).json({ message: `Successfully created new User with email ${newUser.email}` });
  } catch (error) {
    console.log("Error creating new User: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

// Modify one User
router.put("/", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {
        email: req.body.email
      },
      {
        role: req.body.role
      }
    );
    console.log(`User entry for email:${req.query.email} was updated`);
    res.status(200).json({ message: "User entry updated" });
  } catch (error) {
    console.log("Error updating User entry: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete one User
router.delete("/", async (req, res) => {
  try {
    await User.deleteOne({
      email: req.query.email
    });
    console.log(`User entry for email: ${req.query.email} was deleted`);
    res.status(200).json({ message: "User entry deleted" });
  } catch (error) {
    console.log("Error deleting User entry: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const Student = require("../models/student");
const express = require("express");
const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find({});

    console.log("Returned all the Students");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error getting Students: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:rin", async (req, res) => {
  // Check to see if Student exists
  try {
    const exists = await Student.exists({
      rin: req.params.rin,
      ccode: req.query.ccode,
      csubject: req.query.csubject,
      ewsdate: req.query.ewsdate,
    });

    // If it exists, attempt to return it
    if (exists) {
      try {
        const data = await Student.findOne({
          rin: req.params.rin,
          ccode: req.query.ccode,
          csubject: req.query.csubject,
          ewsdate: req.query.ewsdate,
        });

        console.log(`Returned the EWS entry created on ${data.ewsdate}\
        for ${data.fname} ${data.lname} in course ${data.csubject}${data.ccode}`);

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

router.post("/", async (req, res) => {
  try {
    const docs = await Student.insertMany(req.body.data);
    console.log(`Inserted ${docs.length} new EWS entries`);

    res
      .status(200)
      .json({ message: `Successfully inserted ${docs.length} EWS entries` });
  } catch (error) {
    console.log("Error inserting new EWS data: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:rin", async (req, res) => {
  try {
    await Student.findOneAndUpdate(
      {
        rin: req.params.rin,
        ccode: req.query.ccode,
        csubject: req.query.csubject,
        ewsdate: req.query.ewsdate,
      },
      {
        status: req.body.status,
        cprof: req.body.cprof,
        assignedla: req.body.assignedla,
      }
    );
    console.log(`EWS entrty for rin:${req.params.rin}\
    course:${req.query.csubject}${req.query.ccode} date:${req.query.ewsdate} was updated`);
    res.status(200).json({ message: "EWS entry updated" });
  } catch (error) {
    console.log("Error updating EWS entry: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Student.deleteMany({});
    console.log(`All EWS entries have been deleted`);
    res.status(200).json({ message: "All EWS entries deleted" });
  } catch (error) {
    console.log("Error deleting EWS entries: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:rin", async (req, res) => {
  try {
    console.log(req.params.rin);
    console.log(req.body);
    await Student.deleteOne({
      rin: req.params.rin,
      ccode: req.body.ccode,
      csubject: req.body.csubject,
      ewsdate: req.body.ewsdate,
      ewsreason: req.body.ewsreason,
    });
    console.log(`EWS entry for rin:${req.params.rin}\
    course:${req.query.csubject}${req.query.ccode} date:${req.query.ewsdate} was deleted`);
    res.status(200).json({ message: "EWS entry deleted" });
  } catch (error) {
    console.log("Error deleting EWS entry: " + error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

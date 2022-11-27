const Student = require("../models/student");
const express = require("express");
const router = express.Router();
const database = require("../db");

// Get all students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find({});

    // console.log(req.user);

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
    var inserted = 0;

    for (let student of req.body.students) {
      try {
        const exists = await Student.exists({
          rin: student.rin,
        });

        // If it exists, attempt to return it
        if (exists) {
          try {
            const data = await Student.findOne({
              rin: student.rin,
            });

            var newewscount = data.ewscount + 1;
            student.ewscount = newewscount;

            await Student.updateMany(
              {
                rin: student.rin
              },
              {
                ewscount: newewscount
              }
            );
          } catch (error) {
            console.log(`Error updating EWS Count for RIN: ${student.rin}` + error.message);
            res.status(500).json({ message: error.message });
          }
        }

        await Student.create(student);
        inserted++;
      } catch (error) {
        console.log("Error inserting student: " + error.message);
        res.status(500).json({ message: error.message });
      }
    };


    console.log(`Inserted ${inserted} new EWS entries`);

    res
      .status(200)
      .json({ message: `Successfully inserted ${inserted} EWS entries` });
});

router.put("/:rin", async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    var ret = await Student.findOneAndUpdate(
      {
        rin: req.params.rin,
        ccode: req.body.ccode,
        csubject: req.body.csubject,
        ewsdate: req.body.ewsdate,
        ewsreason: req.body.ewsreason
      },
      {
        status: req.body.status,
        lacomment: req.body.lacomment,
        assignedla: req.body.assignedla,
      }
    );
    console.log(ret);
    console.log(`EWS entrty for rin:${req.params.rin} \
course:${req.body.csubject}${req.body.ccode} date:${req.body.ewsdate} was updated`);
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
  const session = await database.startSession();
  session.startTransaction();
  try {
    await Student.deleteOne({
      rin: req.params.rin,
      ccode: req.body.ccode,
      csubject: req.body.csubject,
      ewsdate: req.body.ewsdate,
      ewsreason: req.body.ewsreason,
    });

    console.log(`EWS entry for rin:${req.params.rin}\
    course:${req.body.csubject}${req.body.ccode} date:${req.body.ewsdate} was deleted`);
  } catch (error) {
    console.log("Error deleting EWS entry: " + error.message);
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  }

  const exists = await Student.exists({
    rin: req.params.rin,
  });

  // If it exists, attempt to return it
  if (exists) {
    console.log('exists')
    try {
      const data = await Student.findOne({
        rin: req.params.rin,
      });

      var newewscount = data.ewscount - 1;
      console.log(newewscount);

      await Student.updateMany(
        {
          rin: req.params.rin,
        },
        {
          ewscount: newewscount,
        }
      );
    } catch (error) {
      console.log(
        `Error updating EWS Count for RIN: ${student.rin}` + error.message
      );
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    }
  }

  await session.commitTransaction();
  session.endSession();
  res.status(200).json({ message: "EWS entry deleted" });
});

module.exports = router;

// sectionRoute.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const versionId = req.query.version_id;

  if (!versionId) {
    return res.status(400).json({ error: "version_id parameter is required" });
  }
  db.connection
    .promise()
    .query("SELECT * FROM section_table WHERE version_id = ?", [versionId])
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error("Error executing SQL query:", error);
    });
});

// New route to get section content by section_id
router.get("/content", (req, res) => {
  const sectionId = req.query.section_id;

  if (!sectionId) {
    return res.status(400).json({ error: "section_id parameter is required" });
  }
  db.connection
    .promise()
    .query("SELECT * FROM section_table WHERE section_id = ?", [sectionId])
    .then(([rows, fields]) => {
      res.json(rows[0]); // Assuming section_id is unique and will return a single row
    })
    .catch((error) => {
      console.error("Error executing SQL query:", error);
    });
});

module.exports = router;

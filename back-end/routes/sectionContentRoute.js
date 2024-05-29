const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
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
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;

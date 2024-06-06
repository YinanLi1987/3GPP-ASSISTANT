// crBySectionRoute.js
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
    .query(
      "SELECT cr_id, cr_number, cr_title ,summary_of_change FROM cr_table WHERE JSON_CONTAINS(clauses_affected, JSON_ARRAY(?))",
      [sectionId]
    )
    .then(([rows, fields]) => {
      console.log("CRs fetched:", rows); // Debugging
      res.json(rows);
    })
    .catch((error) => {
      console.error("Error fetching CRs:", error);
    });
});

module.exports = router;

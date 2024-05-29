const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const specId = req.query.spec_id;

  if (!specId) {
    return res.status(400).json({ error: "spec_id parameter is required" });
  }
  db.connection
    .promise()
    .query("SELECT * FROM spec_version_table WHERE spec_id = ?", [specId])
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error("Error executing SQL query:", error);
    });
});

module.exports = router;

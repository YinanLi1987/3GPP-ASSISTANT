// SpecRoute.js

const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.connection
    .promise()
    .query("SELECT * FROM spec_table")
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error("Error executing SQL query:", error);
    });
});

module.exports = router;

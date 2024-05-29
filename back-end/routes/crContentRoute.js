// Define a new route to fetch CR data by tdocnumber

const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:tdocnumber", (req, res) => {
  const tdocnumber = req.params.tdocnumber;

  if (!tdocnumber) {
    return res.status(400).json({ error: "tdocnumber parameter is required" });
  }

  db.connection
    .promise()
    .query("SELECT * FROM cr_table WHERE tdoc_number = ?", [tdocnumber])
    .then(([rows, fields]) => {
      console.log("CR data fetched:", rows); // Debugging
      res.json(rows);
    })
    .catch((error) => {
      console.error("Error fetching CR data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;

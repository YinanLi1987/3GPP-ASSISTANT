const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:sectionId", (req, res) => {
  const sectionId = req.params.sectionId;
  console.log("Received sectionId:", sectionId); // Log the received sectionId
  const query = `
  MATCH (s:Section {section_id: $sectionId})-[*]-(n)
  MATCH (n)-[r]-()
  RETURN s,n, r
`;
  console.log("Executing query:", query); // Log the constructed query
  db.session
    .run(query, { sectionId })
    .then((result) => {
      console.log("Neo4j Query results:", result.records);

      const nodes = [];
      const edges = [];
      const nodeIds = new Set();

      result.records.forEach((record) => {
        const sectionNode = record.get("s");
        const relatedNode = record.get("n");
        const relationship = record.get("r");
        if (sectionNode && !nodeIds.has(sectionNode.identity.toString())) {
          nodes.push({
            data: {
              id: sectionNode.identity.toString(),
              ...sectionNode.properties,
            },
          });
          nodeIds.add(sectionNode.identity.toString());
        }

        if (relatedNode && !nodeIds.has(relatedNode.identity.toString())) {
          nodes.push({
            data: {
              id: relatedNode.identity.toString(),
              ...relatedNode.properties,
            },
          });
          nodeIds.add(relatedNode.identity.toString());
        }

        if (relationship) {
          edges.push({
            data: {
              id: relationship.identity.toString(),
              source: relationship.start.toString(),
              target: relationship.end.toString(),
              type: relationship.type, // Retrieve the relationship type directly from the relationship object
              ...relationship.properties,
            },
          });
        }
      });

      res.json({ nodes, edges });
    })
    .catch((error) => {
      console.error("Error executing Neo4j query:", error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;

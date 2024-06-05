/* RelationshipsBox.js */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Graph";

const RelationshipsBox = ({ sectionId }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!sectionId) return;

    axios
      .get(`http://localhost:3011/neo4j-data/${sectionId}`)
      .then((response) => {
        const { nodes, edges } = response.data;
        setElements([...nodes, ...edges]);
      })
      .catch((error) => {
        console.error("Error fetching relationships:", error);
      });
  }, [sectionId]);

  if (!elements.length) {
    return <div>Loading relationships...</div>;
  }

  return (
    <div>
      <h2>Relationships of Section {sectionId}</h2>
      <Graph elements={elements} />
    </div>
  );
};

export default RelationshipsBox;


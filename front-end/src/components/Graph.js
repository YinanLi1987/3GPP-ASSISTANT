/* Graph.js */

import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { useNavigate } from "react-router-dom";

const Graph = ({ elements }) => {
  const navigate = useNavigate();

  const handleNodeClick = (event) => {
    const node = event.target;
    const tdocnumber = node.data("captain"); // Assuming 'captain' is the tdocnumber
    if (tdocnumber) {
      navigate(`/cr/${tdocnumber}`);
    }
  };
  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "800px", height: "600px" }}
      layout={{ name: "cose" }}
      stylesheet={[
        {
          selector: "node",
          style: {
            label: "data(captain)",
            "background-color": "#6FB1FC",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "6px",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(type)", // Define the property to display as the label
            "font-size": "4px",
            "text-rotation": "autorotate",
            "text-wrap": "wrap",
            "text-max-width": "150px",
            "text-background-color": "#ffffff",
            "text-background-opacity": 0.7,
            "text-background-padding": "5px",
          },
        },
      ]}
      cy={(cy) => {
        cy.on("click", "node", handleNodeClick);
      }}
    />
  );
};

export default Graph;

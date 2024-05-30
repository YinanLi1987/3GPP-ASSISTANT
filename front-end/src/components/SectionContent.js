/* SectionContent.js */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RelationshipsBox from "./RelationshipsBox";

function SectionContent({ setSectionContent, setCrContent }) {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [crList, setCrList] = useState([]);
  const [expandedCr, setExpandedCr] = useState(null);
  const [viewMode, setViewMode] = useState("crList");
  //const [sectionData, setSectionData] = useState(null);
  useEffect(() => {
    //console.log("Fetching section content for sectionId:", sectionId); // Debugging
    if (typeof setSectionContent !== "function") {
      console.error("setSectionContent is not a function", setSectionContent);
      return;
    }
    if (typeof setCrContent !== "function") {
      console.error("setCrContent is not a function", setCrContent);
      return;
    }
    axios
      .get(`http://localhost:3011/section_content?section_id=${sectionId}`)
      .then((response) => {
        setSection(response.data);
        setSectionContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching section content:", error);
      });
    //console.log("Fetching CR list for sectionId:", sectionId); // Debugging
    axios
      .get(`http://localhost:3011/crs_by_section?section_id=${sectionId}`)
      .then((response) => {
        setCrList(response.data);
        setCrContent(response.data); // Pass CR data to the parent component
      })
      .catch((error) => {
        console.error("Error fetching CR list:", error);
      });
  }, [sectionId, setSectionContent, setCrContent]);

  //Function to toggle accordion for crs
  const toggleAccordion = (cr) => {
    if (expandedCr === cr.cr_id) {
      setExpandedCr(null); // Collapse if already expanded
    } else {
      setExpandedCr(cr.cr_id); // Expand if not expanded
    }
  };
  //Function to toggle view mode between CR list and relationships
  const toggleViewMode = () => {
    setViewMode(viewMode === "crList" ? "relationships" : "crList");
  };
  if (!section) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",

        margin: "20px",
      }}
    >
      <div style={{ width: "35%", outline: "1px solid black" }}>
        <h2>{section.section_title}</h2>
        <h3>Section Number: {section.section_number}</h3>
        <p>{section.section_content}</p>
      </div>
      <div style={{ width: "55%", outline: "1px solid black" }}>
        <h2>
          {viewMode === "crList"
            ? "CRs Associated with Current Section"
            : "Relationships of Current Section"}
        </h2>
        <button onClick={toggleViewMode}>
          {viewMode === "crList" ? "Show Relationships" : "Show CRs"}
        </button>
        {viewMode === "crList" ? (
          <ul>
            {crList.map((cr) => (
              <li key={cr.cr_id}>
                <button
                  onClick={() => toggleAccordion(cr)}
                  style={{
                    backgroundColor:
                      expandedCr === cr.cr_id ? "#ddd" : "transparent",
                    border: "none",
                    padding: "10px",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <strong>{cr.cr_number}</strong>: {cr.cr_title}
                </button>
                {expandedCr === cr.cr_id && (
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      marginTop: "5px",
                    }}
                  >
                    <h3>CR Summary</h3>
                    <p>
                      <strong>Number:</strong> {cr.cr_number}
                    </p>
                    <p>
                      <strong>Title:</strong> {cr.cr_title}
                    </p>
                    <p>
                      <strong>Summary:</strong> {cr.summary_of_change}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <RelationshipsBox sectionId={sectionId} />
        )}
      </div>
    </div>
  );
}

export default SectionContent;

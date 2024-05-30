// src/components/SectionContent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SectionContent({ setSectionContent, setCrContent }) {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3011/section_content?section_id=${sectionId}`)
      .then((response) => {
        setSection(response.data);
        setSectionContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching section content:", error);
      });
    axios
      .get(`http://localhost:3011/crs_by_section?section_id=${sectionId}`)
      .then((response) => {
        setCrContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching CR list:", error);
      });
  }, [sectionId, setSectionContent, setCrContent]);

  if (!section) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-details">
      <h2>{section.section_title}</h2>
      <h3>Section Number: {section.section_number}</h3>
      <p>{section.section_content}</p>
    </div>
  );
}

export default SectionContent;


import React, { useState, useEffect } from "react";
import axios from "axios";

function SectionDropdown({ onSelect, selectedVersionId }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!selectedVersionId) {
      return; //Do not fetch versions if no spec is selected
    }
    console.log("Fetching sections for version_id:", selectedVersionId); // Debugging

    axios
      .get(
        `http://localhost:3011/section_number?version_id=${selectedVersionId}`
      )
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, [selectedVersionId]);

  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Secotion</option>
        {sections.map((section) => (
          <option key={section.section_id} value={section.section_id}>
            {section.section_number}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SectionDropdown;

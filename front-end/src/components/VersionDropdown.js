/* VersionDropdown.js */

import React, { useState, useEffect } from "react";
import axios from "axios";

function VersionDropdown({ onSelect, selectedSpecId }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (!selectedSpecId) {
      return; //Do not fetch versions if no spec is selected
    }
    //console.log("Fetching versions for spec_id:", selectedSpecId); // Debugging
    axios
      .get(`http://localhost:3011/version_number?spec_id=${selectedSpecId}`)
      .then((response) => {
        setVersions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching versions:", error);
      });
  }, [selectedSpecId]);

  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Version</option>
        {versions.map((version) => (
          <option key={version.version_id} value={version.version_id}>
            {version.version_number}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VersionDropdown;

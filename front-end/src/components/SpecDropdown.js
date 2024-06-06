/* SpecDropdown.js */

import React, { useState, useEffect } from "react";
import axios from "axios";

function SpecDropdown({ onSelect }) {
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3011/spec_number")
      .then((response) => {
        setSpecs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specs:", error);
      });
  }, []);

  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Spec</option>
        {specs.map((spec) => (
          <option key={spec.spec_id} value={spec.spec_id}>
            {spec.spec_number}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpecDropdown;


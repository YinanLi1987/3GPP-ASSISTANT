import React from "react";
import { useNavigate } from "react-router-dom";

function ApplyButton({ selectedSectionId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectedSectionId) {
      navigate(`/section/${selectedSectionId}`);
    } else {
      alert("Please select a section");
    }
  };

  return <button onClick={handleClick}>Apply</button>;
}

export default ApplyButton;

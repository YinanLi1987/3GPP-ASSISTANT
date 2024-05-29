// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpecDropdown from "./components/SpecDropdown";
import VersionDropdown from "./components/VersionDropdown";
import SectionDropdown from "./components/SectionDropdown";
import ApplyButton from "./components/ApplyButton";
import SectionContent from "./components/SectionContent";
import CRDetails from "./components/CRDetails";
import Chatbot from "./components/Chatbot";
function App() {
  const [selectedSpecId, setSelectedSpecId] = useState("");
  const [selectedVersionId, setSelectedVersionId] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [sectionContent, setSectionContent] = useState(null);
  const [crContent, setCrContent] = useState([]);

  return (
    <Router>
      <div>
        <h1>3GPP ASSISTANT 3rd</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SpecDropdown onSelect={setSelectedSpecId} />
          <VersionDropdown
            selectedSpecId={selectedSpecId}
            onSelect={setSelectedVersionId}
          />
          <SectionDropdown
            selectedVersionId={selectedVersionId}
            onSelect={setSelectedSectionId}
          />
          <ApplyButton selectedSectionId={selectedSectionId} />
        </div>
        <Routes>
          <Route
            path="/section/:sectionId"
            element={
              <div style={{ display: "flex" }}>
                <SectionContent
                  setSectionContent={setSectionContent}
                  setCrContent={setCrContent}
                />
                <Chatbot
                  sectionContent={sectionContent}
                  crContent={crContent}
                />
              </div>
            }
          />
          <Route
            path="/cr/:tdocnumber"
            element={
              <div style={{ display: "flex" }}>
                <CRDetails />
                <Chatbot
                  sectionContent={sectionContent}
                  crContent={crContent}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

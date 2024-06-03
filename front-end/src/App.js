// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import SectionContent from './components/SectionContent';
import CRDetails from './components/CRDetails';
import Chatbot from './components/Chatbot';
import MiddleSection from './components/MiddleSection'
import './App.css';


function App() {
  const [selectedSpecId, setSelectedSpecId] = useState('');
  const [selectedVersionId, setSelectedVersionId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [sectionContent, setSectionContent] = useState(null);
  const [crContent, setCrContent] = useState([]);
  const [viewMode, setViewMode] = useState('crList');
  const [expandedCr, setExpandedCr] = useState(null);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'crList' ? 'relationships' : 'crList');
  };

  const toggleAccordion = (cr) => {
    setExpandedCr(expandedCr === cr.cr_id ? null : cr.cr_id);
  };

  return (
    <Router>
      <div className="app-container">
        <TopBar
          setSelectedSpecId={setSelectedSpecId}
          selectedSpecId={selectedSpecId}
          setSelectedVersionId={setSelectedVersionId}
          selectedVersionId={selectedVersionId}
          setSelectedSectionId={setSelectedSectionId}
          selectedSectionId={selectedSectionId}
        />
        <div className="main-content">
          <div className="left-section">
            <Routes>
              <Route
                path="/section/:sectionId"
                element={
                  <SectionContent
                    setSectionContent={setSectionContent}
                    setCrContent={setCrContent}
                  />
                }
              />
              <Route path="/cr/:tdocnumber" element={<CRDetails />} />
            </Routes>
          </div>
          <div className="middle-section">
            <button onClick={toggleViewMode}>
              {viewMode === 'crList' ? 'Show Relationships' : 'Show CRs'}
            </button>
            <Routes>
              <Route
                path="/section/:sectionId"
                element={
                  <MiddleSection
                    viewMode={viewMode}
                    crContent={crContent}
                    toggleAccordion={toggleAccordion}
                    expandedCr={expandedCr}
                    sectionId={selectedSectionId}
                  />
                }
              />
            </Routes>
          </div>
          <div className="right-section">
            <Chatbot sectionContent={sectionContent} crContent={crContent} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

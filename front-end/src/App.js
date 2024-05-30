// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import SectionContent from './components/SectionContent';
import CRDetails from './components/CRDetails';
import Chatbot from './components/Chatbot';
import RelationshipsBox from './components/RelationshipsBox';
import './App.css';

function MiddleSection({ viewMode, crContent, toggleAccordion, expandedCr, sectionId }) {
  return viewMode === 'crList' ? (
    <div className="cr-list-container">
      <h2>CRs Associated with Current Section</h2>
      <ul>
        {crContent.map((cr) => (
          <li key={cr.cr_id}>
            <button
              onClick={() => toggleAccordion(cr)}
              style={{
                backgroundColor:
                  expandedCr === cr.cr_id ? '#ddd' : 'transparent',
                border: 'none',
                padding: '10px',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <strong>{cr.cr_number}</strong>: {cr.cr_title}
            </button>
            {expandedCr === cr.cr_id && (
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  marginTop: '5px',
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
    </div>
  ) : (
    <RelationshipsBox sectionId={sectionId} />
  );
}

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

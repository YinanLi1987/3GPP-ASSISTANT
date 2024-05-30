// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import SectionContent from './components/SectionContent';
import CRDetails from './components/CRDetails';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [selectedSpecId, setSelectedSpecId] = useState('');
  const [selectedVersionId, setSelectedVersionId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [sectionContent, setSectionContent] = useState(null);
  const [crContent, setCrContent] = useState([]);

  return (
    <Router>
      <div>
        <TopBar
          setSelectedSpecId={setSelectedSpecId}
          selectedSpecId={selectedSpecId}
          setSelectedVersionId={setSelectedVersionId}
          selectedVersionId={selectedVersionId}
          setSelectedSectionId={setSelectedSectionId}
          selectedSectionId={selectedSectionId}
        />
        <div className="content">
          <Routes>
            <Route
              path="/section/:sectionId"
              element={
                <div style={{ display: 'flex' }}>
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
                <div style={{ display: 'flex' }}>
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
      </div>
    </Router>
  );
}

export default App;

// src/components/TopBar.js
import React from 'react';
import SpecDropdown from './SpecDropdown';
import VersionDropdown from './VersionDropdown';
import SectionDropdown from './SectionDropdown';
import ApplyButton from './ApplyButton';
import logo from '../logo.png'; // Ensure you have the logo.svg file

function TopBar({ setSelectedSpecId, selectedSpecId, setSelectedVersionId, selectedVersionId, setSelectedSectionId, selectedSectionId }) {
  return (
    <div className="top-bar">
      <div className="top-bar-row">
        <img src={logo} alt="Logo" className="logo" />
        <h1>3GPP ASSISTANT 3rd</h1>
      </div>
      <div className="filter-row">
        <SpecDropdown onSelect={setSelectedSpecId} />
        <VersionDropdown onSelect={setSelectedVersionId} selectedSpecId={selectedSpecId} />
        <SectionDropdown onSelect={setSelectedSectionId} selectedVersionId={selectedVersionId} />
        <ApplyButton selectedSectionId={selectedSectionId} />
      </div>
    </div>
  );
}

export default TopBar;

/* MiddleSection.js */

import React from 'react';
import RelationshipsBox from './RelationshipsBox';

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
};
  
export default MiddleSection;
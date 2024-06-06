# 3GPP Assistant

## Overview
The 3GPP Assistant is a web application designed to help users navigate and explore the 3rd Generation Partnership Project (3GPP) specifications. It provides features to view different specifications, versions, and sections, and displays associated Change Requests (CRs) and their relationships. Additionally, it includes an AI-powered chatbot that can assist users with queries related to 3GPP content.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Features
- Browse and select different 3GPP specifications and their versions.
- View detailed content of specific sections.
- Explore CRs associated with selected sections.
- Visualize relationships between different sections and CRs using a graph.
- Interactive AI chatbot for assistance with 3GPP-related queries.

## Installation

### Prerequisites
- Node.js and npm
- MySQL
- Neo4j
- OpenAI API key

### Backend Setup

1. Clone the repository and navigate to the backend directory.
    ```bash
    git clone <repository-url>
    cd backend
    ```

2. Install the necessary npm packages.
    ```bash
    npm install
    ```

3. Create a `config.js` file in the `data` directory and add your database and API configurations.
    ```javascript
    module.exports = {
        host: "your-mysql-host",
        user: "your-mysql-username",
        password: "your-mysql-password",
        database: "3gpp_db",
        neo4j_host: "your-neo4j-host",
        neo4j_username: "your-neo4j-username",
        neo4j_password: "your-neo4j-password",
        openai_api_key: "your-openai-api-key",
    };
    ```

4. Start the backend server.
    ```bash
    node app.js
    ```

### Frontend Setup

1. Navigate to the frontend directory.
    ```bash
    cd ../frontend
    ```

2. Install the necessary npm packages.
    ```bash
    npm install
    ```

3. Create a `settings.js` file in the `src` directory and add your OpenAI API key.
    ```javascript
    const API_KEY = "your-openai-api-key";
    export default API_KEY;
    ```

4. Start the frontend server.
    ```bash
    npm start
    ```

### Database Setup

1. Set up your MySQL database and import the provided `data-3gpp-assistant.sql` file to create the necessary tables and insert sample data.
    ```bash
    mysql -u your-username -p 3gpp_db < data/data-3gpp-assistant.sql
    ```

2. Ensure your Neo4j instance is running and accessible with the credentials provided in the `config.js` file.

## API Endpoints

### MySQL Endpoints
- `/spec_number`: Fetch all specifications.
- `/version_number`: Fetch all versions of a specific specification.
- `/section_number`: Fetch all sections of a specific version.
- `/section_content`: Fetch content of a specific section.
- `/crs_by_section`: Fetch CRs associated with a specific section.
- `/cr_data`: Fetch details of a specific CR.

### Neo4j Endpoints
- `/neo4j-data/:sectionId`: Fetch relationships data for a specific section.

## Components

### Frontend Components
- `MiddleSection.js`: Displays a list of CRs or a relationships graph.
- `RelationshipsBox.js`: Fetches and displays the relationships graph.
- `SectionContent.js`: Fetches and displays content of a specific section.
- `SectionDropdown.js`: Dropdown for selecting sections.
- `SpecDropdown.js`: Dropdown for selecting specifications.
- `TopBar.js`: The top bar with dropdowns and an apply button.
- `VersionDropdown.js`: Dropdown for selecting versions.
- `Graph.js`: Displays the relationships graph using Cytoscape.
- `CRDetails.js`: Displays details of a selected CR.
- `Chatbot.js`: Integrates the AI chatbot.
- `ApplyButton.js`: Navigates to the selected section.

### Backend Files
- `app.js`: Main server file.
- `db.js`: Database connection setup.
- `routes/`: Directory containing route definitions for various API endpoints.

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Use the dropdowns in the top bar to select a specification, version, and section.
3. Click "Apply" to load the content and associated CRs of the selected section.
4. Switch between the CR list and relationships view using the provided button.
5. Interact with the chatbot for assistance with 3GPP-related queries.

## Folder Structure:

3GPP-ASSISTANT/\
├── back-end/\
│   ├── routes/\
│   │   ├── crBySectionRoute.js\
│   │   ├── crContentRoute.js\
│   │   ├── neo4jRoute.js\
│   │   ├── sectionContentRoute.js\
│   │   ├── sectionRoute.js\
│   │   ├── specRoute.js\
│   │   └── versionRoute.js\
│   ├── .gitignore\
│   ├── app.js\
│   ├── db.js\
│   ├── package-lock.json\
│   └── package.json\
├── data/\
│   ├── config.js\
│   ├── data-3gpp-assistant.sql\
│   └── settings.js\
├── front-end/\
│   ├── public/\
│   ├── src/\
│   │   ├── components/\
│   │   │   ├── ApplyButton.js\
│   │   │   ├── Chatbot.js\
│   │   │   ├── CRDetails.js\
│   │   │   ├── Graph.js\
│   │   │   ├── MiddleSection.js\
│   │   │   ├── RelationshipsBox.js\
│   │   │   ├── SectionContent.js\
│   │   │   ├── SectionDropdown.js\
│   │   │   ├── SpecDropdown.js\
│   │   │   ├── TopBar.js\
│   │   │   └── VersionDropdown.js\
│   │   ├── App.css\
│   │   ├── App.js\
│   │   ├── App.test.js\
│   │   ├── index.css\
│   │   ├── index.js\
│   │   ├── logo.png\
│   │   ├── reportWebVitals.js\
│   │   └── setupTests.js\
│   ├── .gitignore\
│   ├── package-lock.json\
│   └── package.json\
└── README.md\


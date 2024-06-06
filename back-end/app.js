// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3011;
const db = require("./db");
const cors = require("cors");

const specRoute = require("./routes/specRoute");
const versionRoute = require("./routes/versionRoute");
const sectionRoute = require("./routes/sectionRoute");
const sectionContentRoute = require("./routes/sectionContentRoute");
const crContentRoute = require("./routes/crContentRoute");
const neo4jRoute = require("./routes/neo4jRoute");
const crBySectionRoute = require("./routes/crBySectionRoute");

app.use(cors());
app.use(express.json());

app.use("/spec_number", specRoute);
app.use("/version_number", versionRoute);
app.use("/section_number", sectionRoute);
app.use("/section_content", sectionContentRoute);
app.use("/neo4j-data", neo4jRoute);
app.use("/crs_by_section", crBySectionRoute);
app.use("/cr_data", crContentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

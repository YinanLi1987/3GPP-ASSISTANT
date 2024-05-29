// db.js

const mysql = require("mysql2");
const neo4j = require("neo4j-driver");
const config = require("./config");

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
const driver = neo4j.driver(
  config.neo4j_host,
  neo4j.auth.basic(config.neo4j_username, config.neo4j_password)
);
const session = driver.session();

const OPENAI_API_KEY = config.openai_api_key;

module.exports = {
  connection: connection,
  session: session,
  OPENAI_API_KEY: OPENAI_API_KEY,
};

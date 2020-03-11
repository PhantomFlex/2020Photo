const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();

app.use(express.static("../"));
app.use(express.static("../build"));

app.get("/leha", (req, res) => {
  const query = "select * from leha;";
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  db.query(query, (err, rows, field) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 3001;
const host = "localhost";
const user = "root";
const password = "159852741";
const dbname = "shmelev";

const db = mysql.createPool({
  host: host,
  user: user,
  password: password,
  port: "3306",
  database: dbname
});

app.listen(port, () => {
  console.log("app listening on", port);
});

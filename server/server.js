const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("../"));
app.use(express.static("../build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const secretPassword = "123";
const secretUsername = "nick";

app.post("/auth", (req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  if (req.body) {
    if (
      req.body.username === secretUsername &&
      req.body.password === secretPassword
    ) {
      res.json({ ok: "hello nick" });
    } else {
      res.json({ ok: "idi nahyi samozvanez" });
    }
  }
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

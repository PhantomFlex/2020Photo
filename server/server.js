const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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

const port = process.env.PORT || 3001;
const host = "localhost";
const user = "root";
const password = "159852741";
const dbname = "shmelev";

var connection = mysql.createConnection({
  host,
  user,
  password,
  database: dbname
});

connection.connect();

app.get("/list", function(req, res) {
  connection.query("SELECT * FROM videos", function(err, data) {
    if (err) return console.log(err);
    res.json(data);
  });
});

app.get("/create", function(req, res) {
  res.render("create.hbs");
});

app.post("/create", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const description = req.body.description;
  const link = req.body.link;
  connection.query(
    `INSERT INTO videos (name, description, link) VALUES ("${name}","${description}","${link}")`,
    function(err, data) {
      if (err) return console.log(err);
      res.send({ ok: true });
    }
  );
});

app.get("/edit/:id", function(req, res) {
  const id = req.params.id;
  pool.query("SELECT * FROM users WHERE id=?", [id], function(err, data) {
    if (err) return console.log(err);
    res.render("edit.hbs", {
      user: data[0]
    });
  });
});

app.post("/edit", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const description = req.body.description;
  const link = req.body.link;
  const id = req.body.id;

  pool.query(
    "UPDATE videos SET name=?, description=?, link=? WHERE id=?",
    [name, description, link, id],
    function(err, data) {
      if (err) return console.log(err);
      res.redirect("/");
    }
  );
});

app.post("/delete/:id", function(req, res) {
  const id = req.params.id;
  connection.query(`DELETE FROM videos WHERE id=${id}`, (err, data) => {
    if (err) return console.log(err);
    res.redirect("/videos");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

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

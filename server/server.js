const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const startServer = app => {
  let connection;
  app.use(express.static("../"));
  app.use(express.static("../build"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const port = process.env.PORT || 3001;
  const host = "localhost";
  const user = "root";
  const password = "1290";
  const dbport = "3306";
  const dbname = "shmelev";
  try {
    connection = mysql.createConnection({
      host,
      user,
      password,
      database: dbname,
      port: dbport
    });

    connection.connect();
  } catch (e) {
    console.log(e);
  }

  app.listen(port, () => {
    console.log("app listening on", port);
  });

  return connection;
};

const connection = startServer(app);

// AUTH
app.post("/auth", (req, res) => {
  const secretPassword = "da";
  const secretUsername = "123";

  res.setHeader("Content-Type", "application/json;charset=utf-8");
  if (req.body) {
    if (
      req.body.username === secretUsername &&
      req.body.password === secretPassword
    ) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, error: "пароль неверный(есть жи!)" });
    }
  }
});

// TAGS
app.get("/api/tags", (req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  connection.query("SELECT * FROM tags", (err, data) => {
    if (err) res.json({ ok: false });
    res.json({ ok: true, data });
  });
});

//VIDEOS
//GET
app.get("/api/videos", function(req, res) {
  connection.query("SELECT * FROM videos", function(err, data) {
    if (err) return console.log(err);
    res.json(data);
  });
});

//CREATE
app.post("/api/videos", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const description = req.body.description;
  const link = req.body.link;
  const tag = req.body.tag;
  const preview = req.body.preview;
  connection.query(
    `INSERT INTO videos (name, description, tag , link , preview ) VALUES ("${name}","${description}","${tag}","${link}", "${preview}")`,
    function(err, data) {
      if (err) return console.log(err);
      res.send({ ok: true });
    }
  );
});

//DELETE
app.delete("/api/videos/:id", function(req, res) {
  const id = req.params.id;
  connection.query(`DELETE FROM videos WHERE id=${id}`, (err, data) => {
    if (err) res.json({ ok: false });
    res.json({ ok: true });
  });
});

//all routes (other routes redirect client to index react page)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

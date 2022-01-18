var express = require("express");
var app = express();
require("dotenv").config();

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({
      time: req.time,
    });
  }
);

app.get("/json", function (req, res) {
  var message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({
    message: message,
  });
});

app.get("/:word/echo", function (req, res) {
  res.send({
    echo: req.params.word,
  });
});

app
  .route("/name")
  .get(function (req, res) {
    res.send({
      name: `${req.query.firstname} ${req.query.lastname}`,
    });
  })
  .post(function (req, res) {
    console.log(req.query);
    res.status(201).send();
  });

module.exports = app;

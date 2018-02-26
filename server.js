const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const app = express();

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const port = 8000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});


var noteScheme = require('./app/schemes/note_sheme')(Schema, mongoose);

mongoose.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require("./app/routes")(app, database, noteScheme);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});

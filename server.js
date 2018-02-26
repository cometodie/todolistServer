const express = require("express");
const bodyParser = require("body-parser");
const dbUrl = require("./config/db");
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const port = 8000;

mongoose.connect(dbUrl.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

var routes = require("./app/routes");
app.use('/', routes);

app.listen(8000, function () {
  console.log('Express app listening on port 8000');
});   
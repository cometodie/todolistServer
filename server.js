const express = require("express");
const dbUrl = require("./config/db");
const app = express();
const mongoose = require("mongoose");

let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const port = 8000;

mongoose.connect(dbUrl.url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('./app/middlewares/middlewares')(app, db);

app.listen(8000, function () {
  console.log('Express app listening on port 8000');
});   
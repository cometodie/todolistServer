const session = require('express-session')
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");

module.exports = (app,db) => {
  app.use(bodyParser.json());
  app.use(
    session({
      secret: "work hard",
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: db
      })
    })
  );

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );

    next();
  });

  var routes = require("../routes");
  app.use("/", routes);

  return app;
};

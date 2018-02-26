const noteRoutes = require('./note_routes');
module.exports = function(app, db, noteScheme) {
  noteRoutes(app, db, noteScheme);
  
};
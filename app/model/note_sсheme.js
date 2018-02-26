var mongoose = require("mongoose");

var noteScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  important: {
    type: Boolean,
    default: false
  }
});

var Note = mongoose.model("Note", noteScheme);
module.exports = Note;
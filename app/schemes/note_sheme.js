module.exports = (Schema, mongoose) => {
  var noteScheme = new Schema({
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
  
  return mongoose.model("Note", noteScheme);
};

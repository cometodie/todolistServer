var ObjectID = require("mongodb").ObjectID;
module.exports = function(app, db, Note) {
  app.get("/notes", (req, res) => {
    Note.find({}, (err, results) => {
      if(err) return send(err);
      res.send(results);
    })
  });

  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    Note.findById(id, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    Note.remove({_id: details}, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
  });

  app.put("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    Note.update({ _id: details }, req.body, function(err, result) {
      if (err) return res.send(err);
      res.send(result);
    });
  });

  app.post("/notes", (req, res) => {
    let note = new Note({
      text: req.body.text,
      title: req.body.title
    });
    note.save().then(err => {
      if (err) return res.send(err);
      res.send(note);
    });
  });
};

const express = require("express");
const app = express();
const notes = require("./data/notes.js");
const dotenv = require("dotenv");
dotenv.config();
app.get("/", (req, res) => {
  res.send("hello guys this my notes app");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/api/:id", (req, res) => {
  let note = notes.find((n) => {
    if (req.params.id == n._id) {
      return n;
    }
  });
  res.json(note);
});
const PORT = process.env.PORT || "5000";
app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});

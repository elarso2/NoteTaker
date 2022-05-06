const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// GET route for /notes to return to notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET route * to return to index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET route /api/notes to read the db.json file and return saved notes as JSON
// app.get("/api/notes", (req,res) =>

// );

// POST route /api/notes to receive new note, add to db.json, and return new note to client

const express = require("express");
const fs = require("fs");
const res = require("express/lib/response");
const { fstat } = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const util = require("util");
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// GET route for /notes to return to notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/notes", (req, res) => res.status(200).json(notes));

// GET route /api/notes to read the db.json file and return saved notes as JSON
app.get("/api/notes", (req, res) => {
  const readFromFile = util.promisify(fs.readFile);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  console.log(`${req.method} request received`);
});

app.get("api/notes", (req, res) => res.status(200).json(db));

// POST route /api/notes to receive new note, add to db.json, and return new note to client
app.post("/api/notes", (req, res) => {
  const { title, text, id } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  const response = {
    status: "success",
    body: newNote,
  };

  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  console.log(`${req.method} request received`);

  res.status(200).json(response);
});

// GET route * to return to index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`App listening at ${PORT} 🚀`));

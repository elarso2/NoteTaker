const express = require("express");
const res = require("express/lib/response");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.port || 3001;
// const api = require("./public/assets/js/index");
// app.use("/api", api);
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
// app.get("/api/notes", (req,res) =>

// );

app.get("api/notes", (req, res) => res.status(200).json(db));

// POST route /api/notes to receive new note, add to db.json, and return new note to client
app.post("/api/notes", (req, res) => {
  const { title, text, id } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
});

// GET route * to return to index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

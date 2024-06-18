const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.js");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://admin:password@3.90.230.35:27017//");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.redirect("/todos");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("index", { todos: todos });
  } catch (err) {
    res.status(500).send(err);
  }
});

// New todo form
router.get("/new", (req, res) => {
  res.render("new");
});

// Create new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    await todo.save();
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Edit todo form
router.get("/:id/edit", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.render("edit", { todo: todo });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update todo
router.post("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete todo
router.post("/:id/delete", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

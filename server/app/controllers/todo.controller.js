const db = require("../models");
const Todo = db.todos;

exports.createToDo = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Todo
  const todo = new Todo({
    title: req.body.title,
    isDone: req.body.isDone ? req.body.isDone : false,
  });

  // Save Todo in the database
  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};

// Retrieve all Todos from the database.
exports.getAllTodos = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Update a ToDo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  try {
  Todo.findById(id).then((todo) => {

    todo.isDone = !todo.isDone;
    
      todo.save((err, result) => {
        return res.json({ result });
      });
    }); 
  }catch (err) {
      next({ status: 400, message: "failed to update todo" });    
  }
};

// Delete all complited ToDo from the database.
exports.deleteAllComplited = (req, res) => {
  Todo.deleteMany({ isDone: true })
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Filter ToDo for status isDone
exports.filterIsDone = (req, res) => {
  const status = req.params.isDone;

  Todo.find({ isDone: status })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find by ID and Delete
exports.deleteToDoById = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with . Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=",
      });
    });
};

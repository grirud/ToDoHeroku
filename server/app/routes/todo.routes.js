module.exports = (app) => {
  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new ToDo
  router.post("/", todos.createToDo);

  // // Retrieve all ToDo
  router.get("/", todos.getAllTodos);

  // Retrieve all complited ToDO
  router.get("/:isDone", todos.filterIsDone);

  // Update a ToDo with id
  router.put("/:id", todos.update);

  // Delete complited ToDo
  router.delete("/", todos.deleteAllComplited);

   // Delete ToDo by ID
   router.delete("/:id", todos.deleteToDoById);

  app.use("/api/todos", router);
};

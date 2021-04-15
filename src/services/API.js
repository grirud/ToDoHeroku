import axios from "axios";

const API_URL = "mongodb+srv://testuser:testuserpass@cluster0.nlwwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/todos";

async function createToDo(title) {
  const { data: newTodo } = await axios.post(API_URL, {
    title,
  });
  return newTodo;
}

async function deleteComplitedToDo() {
  const message = await axios.delete(API_URL);
  return message;
}

async function deleteToDoWithId(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function filterToDoStatus(status) {
  const { data: filterToDos } = await axios.get(`${API_URL}${status}`);
  return filterToDos;
}

async function changeToDoStatus(id) {
  const message = await axios.put(`${API_URL}${id}`);
  return message;
}

async function getAllToDos() {
  const { data: allToDos } = await axios.get(API_URL);
  return allToDos;
}

export default {
  createToDo,
  deleteComplitedToDo,
  deleteToDoWithId,
  filterToDoStatus,
  changeToDoStatus,
  getAllToDos,
};

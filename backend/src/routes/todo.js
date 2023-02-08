const express = require("express");
const auth = require("../middlewares/auth");
const { getAllTodo, getOneTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todo");

const route = express();

route.get("/api/todos", auth, getAllTodo);
route.get("/api/todos/:id", auth, getOneTodo);
route.post("/api/todos", auth, createTodo);
route.put("/api/todos/:id", auth, updateTodo);
route.delete("/api/todos/:id", auth, deleteTodo);

module.exports = route;

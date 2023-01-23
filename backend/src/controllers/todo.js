const { todo } = require("../models");
const responseData = require("../helpers/responseData");
const checkToken = require("../helpers/checkToken")

const getAllTodo = async (req, res) => {
  const id = checkToken(req)
  try {
    const result = await todo.findAll({
      where: { user_id: id }
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error.message ?? "Internal Server Error", null));
  }
};

const getOneTodo = async (req, res) => {
  const { id } = req.params
  try {
    const result = await todo.findOne({
      where: { id: id }
    })
    if (!result) {
      return res.status(404).send(responseData(404, "Not Found", null, null));
    }
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error.message ?? "Internal Server Error", null));
  }
}

const createTodo = async (req, res) => {
  const id = checkToken(req)
  const { todos } = req.body;
  try {
    if (!todos) {
      return res.status(400).send(responseData(400, "PLEASE FILL", null, null));
    }
    const result = await todo.create({
      user_id: id,
      todo: todos,
    });
    return res.status(201).send(responseData(201, "CREATED", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error.message ?? "Internal Server Error", null));
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params
  try {
    const result = await todo.findOne({
      where: { id: id }
    })
    if (!result) {
      return res.status(404).send(responseData(404, "Not Found", null, null));
    }
    await todo.destroy({
      where: { id: id }
    })
    return res.status(200).send(responseData(200, "TODO SUCCESSFULLY DELETED", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error.message ?? "Internal Server Error", null));
  }
}

module.exports = { getAllTodo, getOneTodo, createTodo, deleteTodo };
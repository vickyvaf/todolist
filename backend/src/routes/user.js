const express = require("express");
const auth = require("../middlewares/auth");
const { deleteUser } = require("../controllers/user");

const route = express();

route.delete("/api/users", auth, deleteUser);

module.exports = route;

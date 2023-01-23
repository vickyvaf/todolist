const express = require("express");
const auth = require("../middlewares/auth");
const { deleteUser } = require("../controllers/user");

const route = express();

route.get("/api/users", auth, deleteUser);

module.exports = route;

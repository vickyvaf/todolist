const { register, login } = require("../controllers/auth");
const express = require("express");

const route = express();

route.post("/api/auth/register", register);
route.post("/api/auth/login", login);

module.exports = route;

const { user } = require("../models");
const generateToken = require("../helpers/generateToken");
const passwordHashing = require("../helpers/passwordHashing");
const passwordCompare = require("../helpers/passwordCompare");
const responseData = require("../helpers/responseData");
require("dotenv").config();

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (!name && !username && !password) {
      return res.status(400).send(responseData(400, "PLEASE FILL", null, null));
    }
    const checkUsername = await user.findOne({
      where: {
        username: username,
      },
    });
    if (checkUsername?.username === username) {
      return res
        .status(500)
        .send(responseData(500, "USERNAME HAS BEEN USED", null, null));
    }
    const passwordHash = await passwordHashing(password);
    await user.create({
      name,
      username,
      password: passwordHash,
    });
    return res
      .status(201)
      .send(responseData(201, "SUCCESSFULLY REGISTER", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username && !password) {
      return res.status(400).send(responseData(400, "PLEASE FILL", null, null));
    }

    const checkData = await user.findOne({
      where: { username: username },
    });
    if (!checkData) {
      return res
        .status(401)
        .send(responseData(401, "wrong username or password", null, null));
    }

    const checkPassword = await passwordCompare(password, checkData.password);
    if (!checkPassword) {
      return res
        .status(401)
        .send(responseData(401, "wrong username or password", null, null));
    }

    const userData = {
      id: checkData.id,
      name: checkData.name,
    };
    const token = generateToken(userData);
    return res
      .status(200)
      .send(responseData(200, "SUCCESSFULLY LOGIN", null, token));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

module.exports = { register, login };

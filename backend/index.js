const { sequelize } = require("./src/models");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

const userRoute = require("./src/routes/user");
const todoRoute = require("./src/routes/todo");
const authRoute = require("./src/routes/auth");

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send({
    message: "belajar membuat api nodejs bersama harisenin.com",
  });
});

app.use(userRoute);
app.use(todoRoute);
app.use(authRoute);

sequelize
  .sync()
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("error:", err));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const { user } = require("../models");
const responseData = require("../helpers/responseData");
const checkToken = require("../helpers/checkToken")

const deleteUser = async (req, res) => {
  const id = checkToken(req)
  try {
    const result = await user.findOne({
      where: { id: id }
    })
    if (!result) {
      return res.status(404).send(responseData(404, "Not Found", null, null));
    }
    await user.destroy({
      where: { id: id }
    })
    return res.status(200).send(responseData(200, "USER SUCCESSFULLY DELETED", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
}

module.exports = { deleteUser };

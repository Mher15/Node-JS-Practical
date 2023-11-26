const mongoose = require("mongoose");
const User = require("../models/userModel");
const userService = require("../service/userService");

const getMe = async (req, res) => {
  try {
    const userData = await userService.getMe(req);
    if (!userData.email) {
      res.status(404).send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: userData,
      });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

module.exports = {
  getMe,
};

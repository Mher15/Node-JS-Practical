const AuthService = require("../service/AuthService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");

class UserController {

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("validation error", errors.array()));
      }
      const { userName, email, password } = req.body;
      const userData = await AuthService.registration(
        userName,
        email,
        password
      );
      if (!userData) {
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
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.login(email, password);
      if (!userData) {
        res.status(404).send({ message: "User not found", success: false });
      }
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).send({
        success: true,
        data: userData,
      });
    } catch (e) {
      res
        .status(500)
        .send({ message: e.message, error: e.errors, success: false });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }


  async logout(req, res, next) {
    try {
      const { refreshToken } = req.header;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new UserController();

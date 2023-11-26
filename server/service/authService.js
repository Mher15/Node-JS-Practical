const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const bcrypt = require("bcrypt");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");

class AuthService {
  async registration(username, email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `a user with an email address ${email} already exists`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    const role = await RoleModel.create({
      userId: user._id,
    });

    const userDto = new UserDto(user);
    return { user: userDto };
  }

  async login(email, password) {
    const data = await UserModel.findOne({ email })
      .exec()
      .then((user) => {
        if (user) {
          return RoleModel.findOne({ userId: user._id })
            .exec()
            .then((role) => {
              if (role) {
                return {
                  user,
                  role: role.role
                }
              } else {
                return 'No role found for the user'
              }
            })
            .catch((error) => {
              console.error('Error finding role:', error);
            });
        } else {
          return 'User not found'
        }
      })
    if (!data?.user) {
      throw ApiError.BadRequest("A user with an email address already exists");
    }
    const isPassEquals = await bcrypt.compare(password, data?.user?.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Incorrect password");
    }
    const userDto = new UserDto(data?.user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: { ...userDto, role: data?.role } };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const data = await UserModel.findOne({ email: userData.email })
      .exec()
      .then((user) => {
        if (user) {
          return RoleModel.findOne({ userId: user._id })
            .exec()
            .then((role) => {
              if (role) {
                return {
                  name: user.username,
                  email: user.email,
                  role: role.role
                }
              } else {
                return 'No role found for the user'
              }
            })
            .catch((error) => {
              console.error('Error finding role:', error);
            });
        } else {
          return 'User not found'
        }
      })

    const userDto = new UserDto(data?.user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new AuthService();

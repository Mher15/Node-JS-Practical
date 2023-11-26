module.exports = class UserDto {
  email;
  username;
  role;
  constructor(model) {
    this.email = model.email;
    this.username = model.username;
    this.role = model.role;
  }
};

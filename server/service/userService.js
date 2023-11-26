const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");

class UserService {
    async getMe(req) {
        if (req?.user) {
            const { email } = req?.user
            const user = await UserModel.findOne({ email })
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
            return user
        }
    }
}

module.exports = new UserService();

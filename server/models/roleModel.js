const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: {
      values: ["employee", "administrator"],
      message: "{VALUE} role is not supported.",
    },
    default: "employee",
  },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;

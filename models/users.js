const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  loginId: String,
  password: String,
  passwordConfirm: String,
  name: String,
});

UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Users", UserSchema);

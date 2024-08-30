const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, default: "" },
  email: { type: String, default: "" },
  zurawallet: { type: String },
  personalwallet: { type: String },
  profileImg: { type: String, default: "" },
  karmabalance: { type: Number, default: 0 },
  treesPlanted: { type: Number, default: 0 },
  carbonOffset: { type: Number, default: 0 },
  gotProfileReward: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  accCreated: { type: Date, default: Date.now },
  hasHouseId: { type: Number, default: null },
  hasHouseMetadata: { type: Object, default: null },
  otp: { type: Number, default: null },
  referred: { type: Array },
});

// Check if the model has already been defined before defining it
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};

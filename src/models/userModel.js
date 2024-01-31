const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userDocument: {
    type: String,
    required: true,
  },
  creditCardToken: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;

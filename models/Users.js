const mongoose = require("mongoose");

const Users = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  usercart: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
  },
});

module.exports = mongoose.model("Users", Users);

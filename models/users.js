var mongoose = require("./connection");

var userShema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

var userModel = mongoose.model("users", userShema);

module.exports = userModel;

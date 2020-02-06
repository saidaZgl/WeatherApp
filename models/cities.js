var mongoose = require("./connection");

var cityShema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number
});

var cityModel = mongoose.model("cities", cityShema);

module.exports = cityModel;

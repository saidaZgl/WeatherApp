var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(
  "mongodb+srv://capsule:k3RqNc5rHqXPh3wJ@saidazgl-0zpfc.mongodb.net/weatherapp?retryWrites=true&w=majority",
  options,
  function(err) {
    console.log(err);
  }
);

var cityShema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number
});

var cityModel = mongoose.model("cities", cityShema);

module.exports = cityModel;

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

module.exports = mongoose;

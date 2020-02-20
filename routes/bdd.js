const mongoose = require("mongoose");

// remplir les chaînes de caractères vides ci-dessous par vos propres infos BDD
var user = "";
var password = "";
// ici, il s'agit de l'URL pour accéder à la BDD créée
var dbName = "";

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(
  `mongodb+srv://${user}:${password}@${dbName}`,
  options,
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.info("Connect OK");
    }
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

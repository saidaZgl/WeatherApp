var express = require("express");
var router = express.Router();
var request = require("sync-request");
var cityModel = require("./bdd");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/weather", async function(req, res, next) {
  var cityList = await cityModel.find();
  res.render("weather", { cityList });
});

router.post("/add-city", async function(req, res, next) {
  var data = request(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=c059bee46a5ef8676ac645bab30e90a1`
  );

  var dataAPI = JSON.parse(data.body);
  console.log(dataAPI);

  var alreadyExist = await cityModel.findOne({
    name: req.body.newcity.toLowerCase()
  });

  if (alreadyExist == null && dataAPI.name) {
    var newCity = new cityModel({
      name: req.body.newcity,
      desc: dataAPI.weather[0].description,
      img:
        "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max
    });
    await newCity.save();
  }
  cityList = await cityModel.find();

  res.render("weather", { cityList });
});

router.get("/delete-city", async function(req, res, next) {
  await cityModel.deleteOne({
    _id: req.query.id
  });
  var cityList = await cityModel.find();
  res.render("weather", { cityList });
});

router.get("/update-cities", async function(req, res, next) {
  var cityList = await cityModel.find();

  for (var i = 0; i < cityList.length; i++) {
    var data = request(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=c059bee46a5ef8676ac645bab30e90a1`
    );

    var dataAPI = JSON.parse(data.body);

    await cityModel.updateOne(
      {
        _id: cityList[i].id
      },
      {
        name: cityList[i].name,
        desc: dataAPI.weather[0].description,
        img:
          "http://openweathermap.org/img/wn/" +
          dataAPI.weather[0].icon +
          ".png",
        temp_min: dataAPI.main.temp_min,
        temp_max: dataAPI.main.temp_max
      }
    );
  }
  var cityList = await cityModel.find();
  res.render("weather", { cityList });
});

module.exports = router;

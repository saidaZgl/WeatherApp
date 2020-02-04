var express = require("express");
var router = express.Router();
var request = require("sync-request");

var cityList = [
  {
    name: "Paris",
    desc: "Nuageux",
    img: "/images/picto-1.png",
    temp_min: 2,
    temp_max: 19
  },
  {
    name: "Marseille",
    desc: "Nuageux",
    img: "/images/picto-1.png",
    temp_min: 10,
    temp_max: 23
  },
  {
    name: "Lyon",
    desc: "Nuageux",
    img: "/images/picto-1.png",
    temp_min: 12,
    temp_max: 15
  }
];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/weather", function(req, res, next) {
  res.render("weather", { cityList });
});

router.post("/add-city", function(req, res, next) {
  var data = request(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=c059bee46a5ef8676ac645bab30e90a1`
  );

  var dataAPI = JSON.parse(data.body);
  console.log(dataAPI);

  var alreadyExist = false;

  for (var i = 0; i < cityList.length; i++) {
    if (req.body.newcity.toLowerCase() == cityList[i].name.toLowerCase()) {
      alreadyExist = true;
    }
  }

  if (alreadyExist == false && dataAPI.name) {
    cityList.push({
      name: req.body.newcity,
      desc: dataAPI.weather[0].description,
      img:
        "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max
    });
  }

  res.render("weather", { cityList });
});

router.get("/delete-city", function(req, res, next) {
  cityList.splice(req.query.position, 1);

  res.render("weather", { cityList });
});

module.exports = router;

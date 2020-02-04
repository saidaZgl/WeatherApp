var express = require("express");
var router = express.Router();
var resquest = require("sync-request");

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
  var alreadyExist = false;

  for (var i = 0; i < cityList.length; i++) {
    if (req.body.newcity.toLowerCase() == cityList[i].name.toLowerCase()) {
      alreadyExist = true;
    }
  }

  if (alreadyExist == false) {
    cityList.push({
      name: req.body.newcity,
      desc: "Nuageux",
      img: "/images/picto-1.png",
      temp_min: 2,
      temp_max: 19
    });
  }

  res.render("weather", { cityList });
});

router.get("/delete-city", function(req, res, next) {
  cityList.splice(req.query.position, 1);

  res.render("weather", { cityList });
});

module.exports = router;

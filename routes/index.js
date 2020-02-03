var express = require("express");
var router = express.Router();

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

module.exports = router;

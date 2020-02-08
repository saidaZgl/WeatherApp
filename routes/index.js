var express = require("express");
var router = express.Router();
var request = require("sync-request");

var cityModel = require("../models/cities");

var userModel = require("../models/users");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login");
});

router.get("/weather", async function(req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    var cityList = await cityModel.find();

    res.render("weather", { cityList });
  }
});

router.post("/add-city", async function(req, res, next) {
  var data = request(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`
  );
  var dataAPI = JSON.parse(data.body);

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
      `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`
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

router.post("/sign-up", async function(req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  });

  if (!searchUser) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront
    });

    var newUserSave = await newUser.save();

    req.session.user = {
      name: newUserSave.username,
      id: newUserSave._id
    };

    console.log(req.session.user);

    res.redirect("/weather");
  } else {
    res.redirect("/");
  }
});

router.post("/sign-in", async function(req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  });

  if (searchUser != null) {
    req.session.user = {
      name: searchUser.username,
      id: searchUser._id
    };
    res.redirect("/weather");
  } else {
    res.render("login");
  }
});

router.get("/logout", function(req, res, next) {
  req.session.user = null;

  res.redirect("/");
});

module.exports = router;

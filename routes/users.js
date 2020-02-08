var express = require("express");
var router = express.Router();
var userModel = require("../models/users");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
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

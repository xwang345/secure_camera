var express = require("express");
// var errorHandler = require('errorhandler');
var router = express.Router();
// -----------------------
var ioListener = require("../lib/ioListener");
var dataServiceAuth = require("../lib/loginDataAuth");
const chalk = require("chalk");
// -----------------------

var router = express.Router();

router.setSocketIo = (socket, io) => {
  router.io = io;
  router.socket = socket;
};

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/loginpage");
  } else {
    next();
  }
}

router.get(["/dashboard", "/"], (req, res, next) => {
  res.render("dashboard", { user: undefined });
});

router.get("/howto", (req, res, next) => {
  res.render("howto", { user: undefined });
});

router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs", { user: undefined });
});

router.get("/header", (req, res) => {
  res.render("header", { user: undefined });
});

router.get("/registerpage", (req, res) => {
  res.render("registerpage", {
    successMessage: undefined,
    errorMessage: undefined,
    user: undefined
  });
});

router.get("/loginpage", (req, res) => {
  res.render("loginpage", { errorMessage: undefined, user: undefined });
});

//-----------------------------post router-----------------------------------------------------

router.post("/registerPage", (req, res) => {
  dataServiceAuth
    .registerUser(req.body)
    .then(() => {
      console.log("++++++++++++++++++++");
      res.render("registerPage", {
        successMessage: "User created",
        user: undefined
      });
    })
    .catch(err => {
      console.log("++++++++++++++++++++" + err);
      res.render("registerPage", {
        successMessage: undefined,
        errorMessage: err,
        user: req.body.user
      });
    });
});

router.post("/loginpage", (req, res) => {
  dataServiceAuth
    .checkUser(req.body)
    .then(() => {
      const username = req.body.user;
      console.log(
        chalk.bgGreen(
          JSON.stringify("==================Login Fuction=============")
        )
      );
      console.log(chalk.bgGreen(JSON.stringify(req.body.user)));
      req.session.user = {
        username: username
      };
      res.redirect("/dashboard");
    })
    .catch(err => {
      res.render("loginpage", { errorMessage: err, user: req.body.user });
    });
});

router.post("/api/updatePassword", (req, res) => {
  dataServiceAuth
    .checkUser({ user: req.body.user, password: req.body.currentPassword })
    .then(() => {
      console.log(chalk.bgBlue("The_password_already_checked"));
      dataServiceAuth
        .updatePassword(req.body)
        .then(() => {
          console.log(chalk.bgBlue(">>>Now Update the password!!!!"));
          res.send({
            successMessage: "Password changed successfully for user: ",
            user: req.body.user
          });
        })
        .catch(err => {
          console.log(chalk.red(">>>1Error Update the password!!!!"));
          res.send({ errorMessage: "The new passwords do not match." });
        });
    })
    .catch(err => {
      console.log(chalk.red(">>>2Error Update the password!!!!"));
      console.log(err);
      res.send({ errorMessage: err });
    });
});

router.get("/logout", (req, res) => {
  req.session.reset();
  res.redirect("/");
});

module.exports = router;

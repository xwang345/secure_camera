var express = require("express");
var router = express.Router();
var loginDataAuth = require('../lib/loginDataAuth');

router.setSocketIo = (socket, io) => {
    router.io = io;
    router.socket = socket;
};

router.use((req, res, next) => {
    if (req.session.userInfo && req.session.userInfo.email != '') {
        res.locals.userInfo = req.session.userInfo;
        next();
    } else if (req.url === '/logIn' || req.url === '/signUp' || req.url === '/howto' || req.url === '/aboutUs' || req.url === '/') {
        next();
    } else {
        res.redirect('/');
    }

});

router.get(["/", "/howto"], (req, res, next) => {
    res.render("howto");
});

router.get("/dashboard", (req, res, next) => {
    res.render("dashboard");
});

router.get("/aboutUs", (req, res, next) => {
    res.render("aboutUs");
});

router.post("/signUp", (req, res) => {
    loginDataAuth
        .registerUser(req.body)
        .then(() => {
            res.render("registerPage", {
                successMessage: "User created",
                user: undefined
            });
        })
        .catch(err => {
            res.render("registerPage", {
                successMessage: undefined,
                errorMessage: err,
                user: req.body.user
            });
        });
});

router.post("/logIn", (req, res) => {
    loginDataAuth
        .checkUser(req.body)
        .then((result) => {
            req.session.userInfo = result.userInfo;
            res.redirect('/dashboard')
        })
        .catch(err => {
            res.redirect('/')
        })

});

router.get("/logOut", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

module.exports = router
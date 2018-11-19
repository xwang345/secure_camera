const mongoose = require("mongoose");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const myMongo = require("./my-mongo");
const CONFIG = require("../config");


let Comment = null;



const initialize = () => {
    return new Promise((resolve, reject) => {
        // let db = mongoose.createConnection(dbURI);
        let db = mongoose.createConnection(dbURI, { useNewUrlParser: true });

        db.on("error", err => {
            reject(err); // reject the promise with the provided error
        });
        db.once("open", () => {
            Comment = db.model("users", userSchema);

            resolve("Secess initialize MongoDB");
            console.log(chalk.red("+++++++++++++++"));
        });
    });
};

const registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            reject("Passwords do not match.");
        } else {
            let newUser = new Comment(userData);
            bcrypt.genSalt(10, function(err, salt) {
                // Generate a "salt" using 10 rounds
                if (err) {
                    reject("There was an error encrypting the password");
                }
                bcrypt.hash(userData.password, salt, function(err, hash) {
                    // encrypt the password: "myPassword123"
                    // TODO: Store the resulting "hash" value in the DB

                    console.log(chalk.yellow(hash));
                    newUser.password = hash;
                    console.log(chalk.yellow(newUser));

                    newUser
                        .save()
                        .then(err => {

                            resolve();
                        })
                        .catch(err => {
                            // throw new Error(err);
                            if (err) {
                                if (err.code == 11000) {
                                    reject("User Name already taken");
                                } else {
                                    reject("There was an error creating the user: ${user}");
                                }
                            }
                            // reject("There was an error creating the user222222");
                        });
                });
            });
        }
    });
};

const checkUser = userData => {
    return new Promise((resolve, reject) => {
        myMongo.find(CONFIG.DbUrl, CONFIG.TargetDb, "users", { "email": userData.email }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length) {
                    if (result[0].password == userData.password) {
                        resolve({
                            msg: 'success',
                            state: 1,
                            userInfo: {
                                email: userData.email
                            }
                        });
                    } else {
                        reject({
                            msg: 'password does not match',
                            state: 0
                        });
                    }
                } else {
                    reject({
                        msg: 'email is not existed',
                        state: 0
                    });
                }
            }
        })
    });
};

const updatePassword = userData => {
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            console.log(chalk.bgCyan("The new passwords do not match."));
            reject();
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                // Generate a "salt" using 10 rounds
                if (err) {
                    reject("There was an error encrypting the password");
                }
                bcrypt.hash(userData.password, salt, function(err, hash) {
                    // encrypt the password: "myPassword123"
                    // TODO: Store the resulting "hash" value in the DB
                    console.log(chalk.yellow(hash));
                    Comment.update({ user: userData.user }, { $set: { password: hash } }, { multi: false })
                        .exec()
                        .then(res => {
                            resolve();
                        });
                });
            });
        }
    }).catch(err => {
        reject("The new passwords do not match.");
    });
};

module.exports = {
    initialize,
    registerUser,
    checkUser,
    updatePassword,
}
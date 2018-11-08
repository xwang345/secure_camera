const mongoose = require('mongoose');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

var userSchema = new Schema({
    "user": {type: String, unique: true},
    "password": String
});
var Comment; // to be defined on new connection (see initialize)

var dbURI = "mongodb://xwang345:Aoiwxc93!@ds151463.mlab.com:51463/home_security"

module.exports.initialize = () => {
    console.log("============================================");
    console.log("===                                      ===");
    console.log("===    MongoDB for auth initialize       ===");
    console.log("===                                      ===");
    console.log("============================================");
    console.log("\n")
    console.log(">>> DB dbURI: " + dbURI + " <<<");
    console.log("\n")
    return new Promise((resolve, reject) => {
        // let db = mongoose.createConnection(dbURI);
        let db = mongoose.createConnection(dbURI, { useNewUrlParser: true });

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("qwe", userSchema);
            // Comment.remove({ }, function (err) { }); // remove collection
            resolve("Secess initialize MongoDB");
            console.log(chalk.red("+++++++++++++++"));
        });
    });
};

module.exports.registerUser = (userData) => {
    console.log("============================================");
    console.log("===                                      ===");
    console.log("===           registerUser Function      ===");
    console.log("===                                      ===");
    console.log("============================================");
    console.log("\n");
    console.log(userData);
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            reject("Passwords do not match.");
        } else {
            let newUser = new Comment(userData);
             bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds
                if (err) {
                    reject("There was an error encrypting the password");
                }
                bcrypt.hash(userData.password, salt, function(err, hash) { // encrypt the password: "myPassword123"
                    // TODO: Store the resulting "hash" value in the DB

                    console.log(chalk.yellow(hash));
                    newUser.password = hash;
                    console.log(chalk.yellow(newUser));

                newUser.save((err) => {
                    console.log(chalk.blue("===   Object is saving in the database.  ==="));
                    console.log(chalk.blue("============================================"));
                    console.log(userData);
                    console.log(chalk.blue("============================================"));
                    console.log(chalk.blue("This is User object id from userSchema: " + newUser._id));
                    console.log(chalk.green(newUser));
                    resolve();

                    if (err) {
                        if (err.code == 11000) {
                            reject("User Name already taken");
                            console.log(chalk.red("User Name already taken"))
                        } else {
                            reject("There was an error creating the user: ${user}");
                        }
                    }
                })


            //         newUser.save((err) => {
            //             console.log(chalk.blue("===   Object is saving in the database.  ==="));
            //             console.log(chalk.blue("============================================"));
            //             console.log(userData);
            //             console.log(chalk.blue("============================================"));
            //             console.log(chalk.blue("This is User object id from userSchema: " + newUser._id));
            //             console.log(chalk.green(newUser));
            //             resolve();
            //         }).catch((err) => {
            //             if (err) {
            //                 if (err.code == 11000) {
            //                     reject("User Name already taken");
            //                 } else {
            //                     reject("There was an error creating the user: ${user}");
            //                 }
            //             }
            // // reject("There was an error creating the user222222");
            //         });
                });
             });
        }});
    }

module.exports.checkUser = (userData) =>{
    console.log(chalk.blue("============================================="));
    console.log(chalk.blue("===                                       ==="));
    console.log(chalk.blue("===     This is checkUser function        ==="));
    console.log(chalk.blue("===                                       ==="));
    console.log(chalk.blue("============================================="));
    // console.log(">>> userName: " + Comment.find({},) + " <<<");
    console.log(">>> userName: " + chalk.green(userData.user) + " <<<");
    console.log(">>> userPasswords: " + chalk.green(userData.password) + " <<<");
    // hash = user.password;
    // console.log(">>> hash: " + chalk.green(hash) + " <<<");


    return new Promise((resolve, reject) => {
        Comment.find({user: userData.user}).exec().then((user) => {
            console.log(chalk.bgCyan("Sucess!!!!!!" + user));
            if (user == null) {
                console.log(chalk.red("There is Error"));
                // try {
                    // console.log(chalk.bgCyan("There is Error"));
                // }catch (err){
                    reject("Unable to find user: " + userData.user);
                // }
            } else {
                hash = user[0].password;
                console.log(chalk.bgMagenta("Staring compare the password"));
                bcrypt.compare(userData.password, hash, (err, valid) => {
                    if (err) { throw (err); };
                    if (valid == true) {
                        // password matches
                        console.log(chalk.green("Match the password"));
                        resolve();
                    }  else if (valid == false) {
                        // password does not match
                        console.log(chalk.red("Unable to match the password"));
                        reject("The current password is worry for user: " + userData.user);
                    }
                });
            }
        }).catch((err) => {
            console.log(chalk.bgCyan("There is Error"));
            reject("Unable to find user: " + userData.user);
        });
    });
};

module.exports.updatePassword = (userData) => {
    console.log(chalk.blue("============================================="));
    console.log(chalk.blue("===                                       ==="));
    console.log(chalk.blue("=== This is ")+chalk.green("updatePassword")+chalk.blue(" function       ===" ));
    console.log(chalk.blue("===                                       ==="));
    console.log(chalk.blue("============================================="));
    return new Promise((resolve, reject) => {
        console.log(chalk.bgGreen("The new password: "+ userData.password));
        console.log(chalk.bgGreen("The new password2: "+ userData.password2));

        if (userData.password != userData.password2) {
            console.log(chalk.bgCyan("The new passwords do not match."));
            reject();
        } else {
            bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds
                if (err) {
                    reject("There was an error encrypting the password");
                }
                bcrypt.hash(userData.password, salt, function(err, hash) { // encrypt the password: "myPassword123"
                    // TODO: Store the resulting "hash" value in the DB
                    console.log(chalk.yellow(hash));
                    Comment.update({ user: userData.user },
                    { $set: { password: hash } },
                    { multi: false }).exec().then((res) => {
                        resolve();
                    });
                });
            });
        }
    }).catch((err) => {
        reject("The new passwords do not match.");
    });
};

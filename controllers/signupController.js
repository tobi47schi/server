const User =  require("../models/user");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt') ;


mongoose.connect("mongodb://localhost:27017/my_db", { useNewUrlParser: true});


exports.signupController = function(req, res){
    //empfänger muss posted haben
     //was wurde geposted
     
    if (!req.body.email ||
        !req.body.username ||
        !req.body.password ||
        !req.body.passwordConf ){
          res.status(403).send("Data not complete");
    } else {
        // Wenn Form komplett Befüllt
        console.log("SignUp_alle Infos da!", Date.now());
        // hash Password

        //MongoDB - Schema befüllen
        console.log("USER_SCHEMA erstellt", Date.now());
        // In MongoDB speichern
        var newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        //passwordConf: req.body.passwordConf
        });
            // In MongoDB speichern
        newUser.save(function (err, user) {
            if (err) {
                //Falls User nicht in DB gespeichert werden konnte
                res.send(err);
            } else {
                console.log(user.username + " saved to Users collection.", Date.now());

            //QUERY
            // https://mongoosejs.com/docs/index.html
            var query = {email : req.body.email}
            User.findOne(query, function (err, user) {
                if (err) {
                    // Auf Error View Weiterleiten
                    res.sendStatus(403);
                }
                res.json(user);
              })
            }
        });
    }
}
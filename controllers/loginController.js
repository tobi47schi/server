const User =  require("../models/user");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt') ;
var jwt = require('jsonwebtoken');

mongoose.connect("mongodb://localhost:27017/my_db", { useNewUrlParser: true});
var jwtOptions = require('../security/jwtSecurity').jwtOptions;

exports.loginController = function(req,res){
    //https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
    // find each person with a last name matching 'Ghost'
    var query = { $or :  [{email: req.body.username}, {username : req.body.username} ]}; // Login mit Email oder Username möglich
    User.findOne(query, function (err, user) {
        if (err) {
            // Auf Error View Weiterleiten
            res.send(err); //403 status Forebidden
        }
        if (!user) { // kein user gefunden
          res.status(403).send("no user"); //403 status Forebidden
        } else {
  
            //Passortauth pruefen!! --> encrypt
            console.log("Von DB:",user.password, user.email);
            var pwCheck = bcrypt.compareSync(req.body.password, user.password) ;
            console.log("PW-CHECK", pwCheck);
            if (pwCheck) {
                var payload = { id:user.id  };
                var token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn : '1d'}); // token wird hier zugewiesen // Zeit, die ein Token wirksam ist (hier 1 Tag)
                res.setHeader("jwt-token" , token);
                
                res.json(user.username );
            }
            else {
                console.log('User konnte nicht eingeloggt werden!');
                res.sendStatus(403); //403 status Forebidden
  
            }
        }
    })
}
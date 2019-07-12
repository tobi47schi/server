var passportJWT = require("passport-jwt");
const dotenv = require('dotenv');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.JWT_SECRETORKEY;

//user
var User = require('../models/user');

var strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {

  var userId = jwt_payload.id;
  try {
    let user= await User.findById(userId);
    console.log(user);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch(err) {
    //db Error
    console.log(err)
  }
});




jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

exports.jwtOptions = jwtOptions;
exports.strategy = strategy;
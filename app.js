var express = require('express');
var passport = require("passport");
var app = express();
var cors = require('cors');
var bodyparser = bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.ENVIROMENT)
//jwtSecurity
var jwtStrategy = require('./security/jwtSecurity').strategy;

//Mongoose
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const User =  require("./models/user");

mongoose.connect("mongodb://localhost:27017/my_db", { useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongodb connection successfull')
});

// Security
//jwtSecurity
var jwtOptions = require('./security/jwtSecurity').jwtOptions;
var jwtStrategy = require('./security/jwtSecurity').strategy;
// security (secret token)
const securityCheck = require('./security/secret').securityCheck;
passport.use(jwtStrategy);

// Controllers
var loginController = require('./controllers/loginController').loginController;
var signupController = require('./controllers/signupController').signupController;
var fileUploadController = require('./controllers/fileUploadController').fileUploadController;

//Helpers
const upload = require('./helpers/fileuploader').upload;

app.use(securityCheck);//secret ==> header "secret", "iv" und "timestamp" sind notwendig
app.use(express.static( 'uploads'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
  console.log('called root');
  res.status(200).send('app is on');
  console.error(constants);
});

app.get('/loggedin',passport.authenticate('jwt', { session: false }), (req, res)=>
  {
    res.send("your logged in! (JWT)");
});


//aus mongodb
app.post('/login', loginController);

//aus mongodb
app.post('/signup',signupController);

app.post('/file', upload.single('file'), fileUploadController);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

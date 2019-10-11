
const secretKey = require('secret-key');
const dotenv = require('dotenv');
dotenv.config();

const passphrase = process.env.SECRET_PASSPHRASE; //selbst zu setzen!!

var secret = secretKey.create(passphrase)

//write secret to file

console.log("secret:" , secret);
exports.securityCheck = (req, res, next) => {
  //console.log("Security Check called")
  if(!req.headers.secret || !req.headers.iv || !req.headers.timestamp) {
    res.status(403).send("Secret, iv and timestamp needed");
  } else if (!secretKey.check(passphrase, req.headers.secret, req.headers.iv, req.headers.timestamp)) {
      // Unauthorized
      return res.sendStatus(401);
  } else {
    next();
  }

  

}

const jwt = require('jsonwebtoken');

const secretKey = "keepThisSecret";
// const payload = {
//   _id: user._id
// };
// const myJWT = jwt.sign(payload, secret);
 
module.exports.secretKey = secretKey;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secretKey, (err, payload) => {
      if (err) { 
        res.status(401).json({verified: false});
      } else {
        next();
      }
    });
  }
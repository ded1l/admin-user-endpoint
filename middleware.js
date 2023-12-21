const jwt = require("jsonwebtoken");

const AuthA = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "admin", (err, decoded) => {
    if (decoded) {
      next();
    } else res.status(401).send({ success: false, msg: "Unauthorized!",error:err.message });
  });
};

async function AuthU(req, res, next) {
  let token = req.headers.token;
  jwt.verify(token, "user",  (err, decoded)=> {
    if (decoded) {
      next();
    } else res.status(401).send({ success: false, msg: "Unauthorized!",error:err.message });
  });
}

module.exports = {
  AuthA,
  AuthU
};
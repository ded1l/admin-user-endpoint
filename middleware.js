const jwt = require("jsonwebtoken");

async function AuthA(req, res, next) {
  const token = req.headers.token;
  try {
    jwt.verify(token, process.env.POWER_KEY);
    next();
  } catch (err) {
    res
      .status(401)
      .send({ success: false, msg: "Unauthorized!", error: err.message });
  }
}

async function AuthU(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send({ message: "Access Denied!" });
  try {
    jwt.verify(token, process.env.POWER_KEY);

    next();
  } catch (err) {
    try {
      jwt.verify(token, process.env.USER_KEY);

      next();
    } catch (err) {
      res.status(401).send({ message: "Access Denied!" });
      console.log(err);
    }
  }
}

module.exports = {
  AuthA,
  AuthU
};
const client = require("../db");

//admin login&register

const adminLogin = (req, res) => {
  let { username, password } = req.body;
  try {
    client.query(
      `SELECT * FROM admins WHERE username = '${username}' AND role = 'admin'`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
        } else {
          if (result.rows.length > 0) {
            bcrypt.compare(
              password,
              result.rows[0].password,
              (err, isMatch) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: err });
                } else {
                  if (isMatch) {
                    let token = jwt.sign(
                      {
                        id: result.rows[0].id,
                        username: result.rows[0].username,
                        role: result.rows[0].role,
                      },
                      process.env.POWER_KEY
                    );
                    res.json({
                      message: "Login success",
                      token: token,
                    });
                  } else {
                    res.json({ message: "Password is incorrect" });
                  }
                }
              }
            );
          } else {
            res.json({ message: "Admin not found" });
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const adminRegister = (req, res) => {
  let { username, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
        } else {
          client.query(
            `INSERT INTO admins (username, password, role) VALUES ('${username}', '${hash}', 'admin') RETURNING *`,
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: err });
              } else {
                res.json(result.rows);
              }
            }
          );
        }
      });
    }
  });
};

module.exports = {
  adminLogin,
  adminRegister,
  
  
};

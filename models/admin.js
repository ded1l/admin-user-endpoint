const client =require("../db");

//admin login&register


const adminLogin = (req, res) => {
    let { username, password } = req.body;
    try {
        client.query(
            `SELECT * FROM users WHERE username = '${username}' AND role = 'admin'`,
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
                                            // process.env.SECRET_KEY
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
    }
}

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
                        `INSERT INTO users (username, password, role) VALUES ('${username}', '${hash}', 'admin') RETURNING *`,
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
}



//products CRUD
 const show=(req, res) => {
    client.query("select * from products").then((result) => res.json(result.rows));
    console.log("show");
  };
  
   const addProduct=(req, res) => {
    let { name, price, discount, image ,active} = req.body;
    client.query(
      `INSERT INTO products (name, price, discount, image) VALUES ('${name}', '${price}', '${discount}', '${image}','${active}') RETURNING *`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
        } else {
          res.json(result.rows);
        }
      }
    );
  };

  const deleteProduct = (req, res) => {
    let { id } = req.body;
    client.query(
      `DELETE FROM products WHERE id = '${id}' RETURNING *`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
        } else {
          res.json(result.rows);
        }
      }
    );
  };
  
  const updateProduct = (req, res) => {
    let { id, name, price, discount, image, active } = req.body;
    client.query(
      `UPDATE products SET name = '${name}', price = '${price}', discount = '${discount}', image = '${image}', active = '${active}' WHERE id = '${id}' RETURNING *`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
        } else {
          res.json(result.rows);
        }
      }
    );
  };


  module.exports = {
    show,
    addProduct,
    deleteProduct,
    updateProduct,
    adminLogin,
    adminRegister,
  };

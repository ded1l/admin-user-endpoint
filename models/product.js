const client = require("../db");

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
  };
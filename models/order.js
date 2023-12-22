const client = require("../db");

async function order(req, res) {
  const { items, userid, address, status } = req.body;
  const result = await client.query(
    `INSERT INTO orders (items, userid, address, orderdate, status) VALUES (${items}, ${userid}, ${address},  ${status}) RETURNING *`,
  
  );
  res.send(result.rows);

}


module.exports = {
  order,
};
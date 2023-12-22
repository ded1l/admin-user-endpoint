const express = require("express");
const app = express();
require('dotenv').config();
const port = 3000;
app.use(express.json());

const admin = require("./routes/admin");
const users = require("./routes/user");


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/v1/admin",admin );
app.use("/api/v1/user", users );



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

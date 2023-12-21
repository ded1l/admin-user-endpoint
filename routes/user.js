const express = require("express");
const router = express.Router();
const {login,register }=require("../models/users")
const {}=require("../models/order")

router.post("/register", register);
router.post("/login", login);
router.post("/order", order);
module.exports = router;
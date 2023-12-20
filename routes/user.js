const express = require("express");
const router = express.Router();
const {login,register }=require("../models/users")


router.post("/register", register);
router.post("/login", login);
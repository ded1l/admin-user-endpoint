const express = require("express");
const router = express.Router();
const { AuthA } = require("../middleware");

const {adminLogin, adminRegister,addProduct,deleteProduct,updateProduct,show  } = require("../models/admin");




//Auth
router.post("/register", adminRegister);
router.post("/login", adminLogin);

//CRUD
router.get("/products/view",AuthA, show);
router.post("/products/add",AuthA, addProduct);
router.delete("/products/delete/:id",AuthA, deleteProduct);
router.put("/products/update/:id",AuthA ,updateProduct);

exports.router = router;
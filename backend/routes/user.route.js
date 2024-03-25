// routes/index.js

import express from "express";
import { getAlluser, signup, login, forgotPassword } from "../controllers/user.controller.js";
import { getAllCategories, createCategory, deleteCategory, updateCategory,   } from "../controllers/category.controller.js";
import { getAllProducts, createProduct, deleteProduct, updateProduct   } from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, getAlluser);

router.post("/signup", signup);
router.post("/login", login);
router.get("/allcategories", getAllCategories);
router.post("/addcategory", createCategory);
router.delete("/deletecategory/:id", deleteCategory); 
router.post("/forgot-password", forgotPassword);
router.put("/updatecategory/:id", updateCategory); 
router.get("/allproducts", getAllProducts);
router.post("/addproduct", createProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProduct); 

export default router;

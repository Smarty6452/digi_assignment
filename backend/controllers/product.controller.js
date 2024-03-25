import { Product } from "../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
    try {
      const { name } = req.query;
      let query = {};
      if (name) {
        query = { name: { $regex: new RegExp(name, "i") } };
      }
      const products = await Product.find(query);
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Get all products with populated category
// export const getAllProducts = async (req, res, next) => {
//   try {
//     const { name } = req.query;
//     let query = {};
//     if (name) {
//       query = { name: { $regex: new RegExp(name, "i") } };
//     }
//     const products = await Product.find(query).populate('category');
//     res.status(200).json({ products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// Create a new product
export const createProduct = async (req, res, next) => {
  const { name, packSize, category, mrp, image, status } = req.body;
  try {
    const product = new Product({
      name,
      packSize,
      category,
      mrp,
      image,
      status
    });
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Return a success response
    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product by ID
export const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const { name, packSize, category, mrp, image, status } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      packSize,
      category,
      mrp,
      image,
      status
    }, { new: true });
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

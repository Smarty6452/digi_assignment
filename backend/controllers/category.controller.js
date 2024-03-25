

import { Category } from "../models/category.model.js";



export const getAllCategories = async (req, res, next) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      query = { name: { $regex: new RegExp(name, "i") } };
    }
    const categories = await Category.find(query);
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new category
export const createCategory = async (req, res, next) => {
  const { name, description, status } = req.body;
  try {
    const category = new Category({
      name,
      description,
      status
    });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    // Return a success response
    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a category by ID
export const updateCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const { name, description, status } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      name,
      description,
      status
    }, { new: true });
    res.status(200).json({ updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

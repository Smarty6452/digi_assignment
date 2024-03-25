import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, fetchCategories } from "../redux/reducer/CategorySlice"; // Import fetchCategories action
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel"; // Import InputLabel component

const AddNewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active", // lowercase status value
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleBack = () => {
    onClose(); // Close the modal on back button click
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (formData.name.trim() === "") {
      validationErrors.name = "Category Name is required";
    }
    if (formData.description.trim() === "") {
      validationErrors.description = "Description is required";
    }

    // Set errors and return if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors
    setErrors({});

    dispatch(addNewCategory(formData)).then(() => {
      dispatch(fetchCategories());
      setSuccess(true);
      onClose();
    });
  };

  return (
    <div className="m-2  mr-6 p-2">
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4">
          <div>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </div>
          <div>
            <Select
              fullWidth
              labelId="status-label"
              id="status"
              value={formData.status}
              onChange={handleChange}
              name="status"
              variant="outlined"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 mt-4 rounded-md"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
        {success && (
          <div className="text-green-500">Data added successfully!</div>
        )}
      </form>
    </div>
  );
};

export default AddNewPage;

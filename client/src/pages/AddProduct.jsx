import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/reducer/CategorySlice';
import { addNewProduct } from '../redux/reducer/ProductSlice';

const AddProduct = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  // Set the initial category value to the first category, if available
  const initialCategory = categories.length > 0 ? categories[0].name : '';

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    packSize: '',
    category: initialCategory, // Set initial category value
    mrp: '',
    image: '',
    status: 'Active' // Default status
  });

  // Handler for input change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    setSuccess(true);
    event.preventDefault();
    dispatch(addNewProduct(formData));
  };

  return (
    <div className='m-2  h-screen mr-6 p-2'>
      <button onClick={handleBack} className="flex items-center text-primary">
        <FiArrowLeft className="mr-1" /> Back
      </button>
      {/* Form for adding a new product */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Category Dropdown */}
          <div>
            <Select
              fullWidth
              value={formData.category}
              onChange={handleChange}
              name="category"
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                 Select Category
              </MenuItem>
              {/* Dynamically populate options from categories */}
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </div>
          {/* Other input fields... */}
          <div>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Pack Size"
              variant="outlined"
              name="packSize"
              value={formData.packSize}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="MRP"
              variant="outlined"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Product Image URL"
              variant="outlined"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <Select
              fullWidth
              value={formData.status}
              onChange={handleChange}
              name="status"
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="contained" className='bg-primary text-white p-2 px-4 rounded-lg' type="submit">
            Submit
          </Button>
          {success && (
          <div className="text-green-500">Data added successfully!</div>
        )}
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

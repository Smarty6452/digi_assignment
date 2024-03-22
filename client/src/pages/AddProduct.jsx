import React from 'react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const AddProduct = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  // State to manage form data
  const [formData, setFormData] = React.useState({
    field1: '',
    field2: '',
    dropdown: ''
  });

  // Handler for input change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };


  const handleImageUpload = (event) => {
  
  };

  return (
    <div className='m-2 shadow-xl h-screen mr-6 p-2'>
      <button onClick={handleBack} className="flex items-center text-primary">
        <FiArrowLeft className="mr-1" /> Back
      </button>
      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Text Field 1 */}
        <div>
          <Select
            fullWidth
            id="dropdown"
            value={formData.dropdown}
            onChange={handleChange}
            name="dropdown"
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
               Category
            </MenuItem>
            <MenuItem value="option1">Milk</MenuItem>
            <MenuItem value="option2">Fruits</MenuItem>
          </Select>
        </div>
        {/* Text Field 2 */}
        <div>
          <TextField
            fullWidth
            id="field1"
            label="Product Names"
            variant="outlined"
            name="Product Names"
            value={formData.field1}
            onChange={handleChange}
          />
        </div>
        {/* Text Field 3 */}
        <div>
          <TextField
            fullWidth
            id="field2"
            label="pack Size"
            variant="outlined"
            name="pack Size"
            value={formData.field2}
            onChange={handleChange}
          />
        </div>
        {/* Text Field 4 (with upload icon) */}
        <div>
          <TextField
         
            fullWidth
            id="field2"
            label="Product Image"
            variant="outlined"
            name="MRP"
            value={formData.field2}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment   position="start">
                  <IconButton
                    edge="end"
                    aria-label="upload picture"
                    onClick={handleImageUpload}
                    component="label"
                  >
                    <FiUpload  />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Text Field 5 */}
        <div>
          <TextField
            fullWidth
            id="field2"
            label="Description"
            variant="outlined"
            name="MRP"
            value={formData.field2}
            onChange={handleChange}
          />
        </div>
        {/* Dropdown Field */}
        <div>
          <Select
            fullWidth
            id="dropdown"
            value={formData.dropdown}
            onChange={handleChange}
            name="dropdown"
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
               Status
            </MenuItem>
            <MenuItem value="option1">Active</MenuItem>
            <MenuItem value="option2">Inactive</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

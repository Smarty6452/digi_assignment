import React from 'react';
import { FiArrowLeft } from 'react-icons/fi'; // Import the arrow left icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router
import TextField from '@mui/material/TextField'; // Import TextField component from Material-UI
import Select from '@mui/material/Select'; // Import Select component from Material-UI
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component from Material-UI

const AddNewPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page in the history stack
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

  return (
    <div className='m-2 shadow-xl h-screen mr-6 p-2'>
      <button onClick={handleBack} className="flex items-center text-primary">
        <FiArrowLeft className="mr-1" /> Back
      </button>
      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Text Field 1 */}
        <div>
          <TextField
            fullWidth
            id="field1"
            label="Category Name"
            variant="outlined"
            name="field1"
            value={formData.field1}
            onChange={handleChange}
          />
        </div>
        {/* Text Field 2 */}
        <div>
          <TextField
            fullWidth
            id="field2"
            label="Description"
            variant="outlined"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
          />
        </div>
        {/* Dropdown */}
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

export default AddNewPage;

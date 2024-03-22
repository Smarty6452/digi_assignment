import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/reducer/UserSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(signup(formData));
      if (response.payload.message === 'User Already Exist') {
        alert('User already exists! Please login.');
      } else {
        alert('Sign up successful! Redirecting to login page...');
        setFormData({ email: '', password: '' }); // Clear form after successful sign up
        history('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex justify-start items-center h-screen mx-10">
      <div className="absolute inset-0 bg-hero-pattern bg-no-repeat bg-cover bg-center z-10 "></div>
      <div className="absolute inset-0 bg-white opacity-50 z-20"></div>
      <form onSubmit={handleSubmit} className="mt-10 w-[530px] relative z-20 bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-md text-gray">Welcome to Digitalflake Admin</h2>
        </div>
        <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { mb: 4 },
          }}
        >
          <TextField
            fullWidth
            id="outlined-required"
            label="Email ID"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
        <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { mb: 4 },
          }}
        >
          <TextField
          className='relative'
            fullWidth
            id="outlined-required"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
             
              endAdornment: (
                <span className='absolute -right-0 mr-2 opacity-70' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              ),
            }}
          />
        </Box>
        <div className="text-end text-gray mb-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#5C218B] p-4 text-white rounded-lg font-medium"
          >
            Sign Up
          </button>
        </div>
      </form>
    
    </div>
  );
};

export default SignUp;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async Thunks
export const login = createAsyncThunk('auth/login', async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/login', formData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
export const signup = createAsyncThunk('auth/signup', async (formData) => {
  const response = await axios.post('http://localhost:5000/api/user/signup', formData);
  return response.data;
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.error = action.error.message;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

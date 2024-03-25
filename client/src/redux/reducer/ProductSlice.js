import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/allproducts');
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  'products/fetchBySearch',
  async (searchQuery, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/allproducts?name=${searchQuery}`);
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Define async thunk for adding a new product
export const addNewProduct = createAsyncThunk(
  'products/addNew',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/addproduct', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (productId, thunkAPI) => {
      try {
        await axios.delete(`http://localhost:5000/api/user/deleteproduct/${productId}`);
        return productId; // Return the ID of the deleted product
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Define async thunk for updating a product
export const updateProduct = createAsyncThunk(
  'products/update',
  async (updatedProduct, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/updateproduct/${updatedProduct._id}`, updatedProduct);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewProduct.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        // Remove the deleted product from state
        state.data = state.data.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      });
  },
});

export default productSlice.reducer;

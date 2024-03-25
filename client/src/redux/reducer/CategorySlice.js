import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/allcategories');
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoriesBySearch = createAsyncThunk(
  'categories/fetchBySearch',
  async (searchQuery, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/allcategories?name=${searchQuery}`);
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  'categories/addNew',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/addcategory', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (categoryId, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/deletecategory/${categoryId}`);
      return categoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async (updatedCategory, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/updatecategory/${updatedCategory._id}`, updatedCategory);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(fetchCategoriesBySearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesBySearch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchCategoriesBySearch.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCategory.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = state.data.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      });
  },
});

export default categorySlice.reducer;

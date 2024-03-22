import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/UserSlice'; // Update the path according to your directory structure

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if any
  },
});

export default store;

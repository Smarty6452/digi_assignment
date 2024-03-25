import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/UserSlice'; 
import categoryReducer from '../reducer/CategorySlice'; 
import productReducer from '../reducer/ProductSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    product: productReducer,
  
  },
});

export default store;

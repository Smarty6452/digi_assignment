import React, { useState, useEffect } from 'react';
import { FiSearch, FiBox } from 'react-icons/fi';
import ProductTable from '../components/ProductTable';
import NewProductForm from './AddProduct'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsBySearch } from '../redux/reducer/ProductSlice'; 

const ProductsPage = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.data); 

  useEffect(() => {
    if (searchQuery.trim() === '') {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsBySearch(searchQuery));
    }
  }, [dispatch, searchQuery]); 

  const handleAddNewClick = () => {
    setShowNewProductForm(true);
  };

  const handleBack = () => {
    setShowNewProductForm(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trim()); 
  };

  return (
    <div className="m-2 shadow-xl h-screen mr-6">
      <div className="header flex justify-between items-center p-4">
        <div className="title flex items-center">
          <FiBox className="mr-2" />
          <span className='hidden md:block'>Products</span>
        </div>
        <div className="searchbar border border-gray flex items-center bg-gray-100 rounded-md opacity-50 p-1">
          <div className="icon m text-gray-500">
            <FiSearch className='opacity-70' />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 w-full md:w-[30rem] bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange} // Call handleSearchChange on input change
          />
        </div>
        <div className="addbtn">
          <button onClick={handleAddNewClick} className="bg-primary rounded-md text-white py-3 text-sm px-4">
            Add New
          </button>
        </div>
      </div>
  
      {showNewProductForm ? (
        <NewProductForm onBack={handleBack} onCancel={() => setShowNewProductForm(false)} /> 
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}

export default ProductsPage;

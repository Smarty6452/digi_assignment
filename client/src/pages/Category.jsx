import React, { useState, useEffect } from "react";
import { FiSearch, FiBox, FiArrowLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import CategoryTable from '../components/CategoryTable';
import { useNavigate } from 'react-router-dom'; 
import { fetchCategories, fetchCategoriesBySearch } from '../redux/reducer/CategorySlice';
import AddNewPage from "./AddCategory";
import Modal from "../components/Modal"; 

const Category = ({ onAddNewClick }) => {
  const [showNewCategoryPage, setShowNewCategoryPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data); 

  useEffect(() => {
    if (searchQuery.trim() === '') {
      dispatch(fetchCategories());
    } else {
      dispatch(fetchCategoriesBySearch(searchQuery));
    }
  }, [dispatch, searchQuery]);

  const handleAddNewClick = () => {
    // Instead of setting showNewCategoryPage, set showModal to true
    setShowModal(true);
    onAddNewClick(); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="m-2 shadow-xl h-screen mr-6">
      <div className="header flex justify-between items-center p-4">
        {showNewCategoryPage ? (
          <div className="title flex items-center">
            <button onClick={() => setShowNewCategoryPage(false)} className="text-primary">
              <FiArrowLeft className="mr-2" />
              Back
            </button>
          </div>
        ) : (
          <div className="title flex items-center">
            <FiBox className="mr-2" />  <span className=" hidden md:block">Category</span> 
          </div>
        )}
        {!showNewCategoryPage && ( 
          <>
            <div className="searchbar border border-gray flex items-center bg-gray-100 rounded-md opacity-50 p-1">
              <div className="icon m text-gray-500">
                <FiSearch className="opacity-70" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 w-full md:w-[30rem] bg-transparent focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="addbtn">
              {/* Modify the onClick handler to handle modal */}
              <button onClick={() => setShowModal(true)} className="bg-primary rounded-md text-white py-3 md:py-2 px-4 text-sm md:text-md">
                Add New
              </button>
            </div>
          </>
        )}
      </div>
      {showNewCategoryPage ? ( 
        <div>hello</div>
        // <NewCategoryPage />
      ) : (
        <CategoryTable data={categories} /> 
      )}
      {/* Render modal if showModal state is true */}
      {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
        
          <AddNewPage onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Category;

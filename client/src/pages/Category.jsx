// Category.js
import React, { useState } from "react";
import { FiSearch, FiBox, FiArrowLeft } from 'react-icons/fi';
import CategoryTable from '../components/CategoryTable';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router

const Category = ({ onAddNewClick }) => {
  const [showNewCategoryPage, setShowNewCategoryPage] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAddNewClick = () => {
    setShowNewCategoryPage(true);
    onAddNewClick(); // Call parent function to handle "Add New" click in the CategoryPage
  };

  const data = [
    { id: 1, name: 'Milk', description: 'Lorem Ipsum', status: 'Active' },
    { id: 2, name: 'Fruits', description: 'Lorem Ipsum', status: 'Inactive' },
    // Add more data as needed
  ];

  return (
    <div className="m-2 shadow-xl h-screen mr-6">
      <div className="header flex justify-between items-center p-4">
        {showNewCategoryPage ? (
          // If showing new category page, display back button
          <div className="title flex items-center">
            <button onClick={() => setShowNewCategoryPage(false)} className="text-primary">
              <FiArrowLeft className="mr-2" />
              Back
            </button>
          </div>
        ) : (
          // If not showing new category page, display Category title
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
              />
            </div>
            <div className="addbtn">
              <button onClick={handleAddNewClick} className="bg-primary rounded-md text-white py-3 md:py-2 px-4 text-sm md:text-md">
                Add New
              </button>
            </div>
          </>
        )}
      </div>
      {showNewCategoryPage ? ( 
        <NewCategoryPage />
      ) : (
        <CategoryTable data={data} /> 
      )}
    </div>
  );
};

export default Category;

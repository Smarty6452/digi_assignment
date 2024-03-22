import React, { useState } from 'react';
import { FiSearch, FiBox } from 'react-icons/fi';
import ProductTable from '../components/ProductTable';
import NewProductForm from './AddProduct'; 
import { useNavigate } from 'react-router-dom';

const ProductsPage = ({ onAddNewClick }) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false); 

  const handleAddNewClick = () => {
    setShowNewProductForm(true);
    onAddNewClick(); 
  };

  const handleBack = () => {
    setShowAddProduct(false);
  };

  const data = [
    { id: 1, name: 'Product 1', packSize: '100g', category: 'Category A', mrp: '$10', image: 'https://s3-alpha-sig.figma.com/img/5717/372d/d1394c21370f384060ae74a34d5b7c03?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dqm4mALOmW8F1KwD5ww-mDp4YeuckGXaDsG4zE6KZcfGH2mO4A-Ai3-zIKrjegWFNbCtJ26MytXCct6kkrRaek0ywVetwzgXV9k7lLZ~uCsOmNXiTpEZe8mfONy0~zaqetWoGVWCKZMukJ3WE1qd69CdirLha27NxOWSOOSuuQByyubHcNs4AvFZGg9XYX8a5UyqYqoKEYy9HzWPETLuJyjk6thGCXLvId1rlPsjuyc0tN7x0AtP8lcV7KXOwp2kAXmjBVpgKW5OBs5pWjMbkjEw~KJOFl5tehhgUZQJR-I1NeNwLcpV5jZaJ88WVV03S2aZv-arEOjgi0QrO0vh4g__', status: 'Active' },
    { id: 2, name: 'Product 2', packSize: '200g', category: 'Category B', mrp: '$20', image: 'https://s3-alpha-sig.figma.com/img/b4a5/99d5/a8aef3a18596a9c9d796331caa7e87de?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCgpqM4qoBuf11~P9Qb4EDccBNkcbwgZzwOVK74b~9DYMHzQpeJ-DQ~IHqXEsWxYFpEe7pIMltJmHJCUm~eTb6gSrCBzuSc45qZqNuhAdNtda~2TO5WXCj4PhXQO~nhPytfcPYBuGce6NXXJfsPDbTPEzsR6HsRXmf9yev1Pf31iW9-W9DdcGVzpKZfGroPRu~oqHpjGBu2YsCmIrPjdxRhHsjEaWRxGCqAS-0b~0UH9OI46pLKJQaU3cA-jTiiFIjBqAmeADC9Pf92MnQB64Cbnpdm9JEgRIiSmEcFtftsaQvlHwh1vT~vzG2W9HUw4CGsMOo61UI2H7JUT7Mt54g__', status: 'Inactive' },
   
  ];

  return (
    <div className="m-2 shadow-xl h-screen mr-6">
      <div className="header flex justify-between items-center p-4">
        <div className="title flex items-center">
          <FiBox className="mr-2" />
          <span className='hidden md:block'>
          Products
          </span>
         
        </div>
        <div className="searchbar border border-gray flex items-center bg-gray-100 rounded-md opacity-50 p-1">
          <div className="icon m text-gray-500">
            <FiSearch className='opacity-70' />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 w-full md:w-[30rem] bg-transparent focus:outline-none"
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
        <ProductTable data={data} />
      )}
    </div>
  );
}

export default ProductsPage;

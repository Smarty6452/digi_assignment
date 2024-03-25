import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import { FaBoxesStacked } from 'react-icons/fa6';
import { FiInbox } from 'react-icons/fi';
import { IoMdArrowDropright } from 'react-icons/io';

const Sidebar = ({ selectedMenu }) => {
  return (
    <div className="side-panel bg-secondary p-4">
      <ul className="space-y-4">
        <li className={`p-2 flex items-center ${selectedMenu === 'home' ? 'bg-[#FFF8B7]' : ''}`}>
          <Link to="/" className="cursor-pointer flex items-center">
            <IoIosHome className="mr-2" />
            Home
            {selectedMenu === 'home' && <IoMdArrowDropright className="ml-auto font-bold" />}
          </Link>
        </li>
        <li className={`p-2 flex items-center ${selectedMenu === 'category' ? 'bg-[#FFF8B7]' : ''}`}>
          <Link to="/category" className="cursor-pointer flex items-center">
            <FaBoxesStacked className="mr-2" />
            Category
            {selectedMenu === 'category' && <IoMdArrowDropright className="ml-auto font-bold" />}
          </Link>
        </li>
        <li className={`p-2 flex items-center ${selectedMenu === 'products' ? 'bg-[#FFF8B7]' : ''}`}>
          <Link to="/products" className="cursor-pointer flex items-center">
            <FiInbox className="mr-2" />
            Products
            {selectedMenu === 'products' && <IoMdArrowDropright className="ml-auto font-bold" />}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

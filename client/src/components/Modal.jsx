// Modal.js

import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed  z-10 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen px-4">
    
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xl w-full">
       
          <div className="p-6">
            <span className="close absolute top-0 right-0 cursor-pointer px-4 py-2" onClick={onClose}> <button   className="flex m-2 items-center text-primary">
        <FiArrowLeft className="mr-1" /> Back
      </button></span>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

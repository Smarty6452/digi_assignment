// Home.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import WelcomePage from "./WelcomePage";
import CategoryPage from "./Category";
import ProductsPage from "./ProductsPage";
// import NewCategoryPage from "./AddItem"; 
import ProductItem from "./AddProduct"; 
import { IoIosHome } from "react-icons/io";
import { FaBoxesStacked } from "react-icons/fa6";
import { FiInbox } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";

// Define icons
const HomeIcon = () => <IoIosHome className="mr-2" />;
const CategoryIcon = () => <FaBoxesStacked className="mr-2" />;
const ProductIcon = () => <FiInbox className="mr-2" />;

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");

  return (
    <>
      <div>
        <Navbar
          onMenuItemClick={(menu) => setSelectedMenu(menu)}
        />
      </div>
      <section className="main grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="side-panel md:col-span-1 bg-secondary p-4 md:h-screen">
          <ul className="space-y-4">
            <li
              onClick={() => setSelectedMenu("home")}
              className={`cursor-pointer p-2 flex items-center ${
                selectedMenu === "home" ? "bg-[#FFF8B7]" : ""
              }`}
            >
              <HomeIcon />
              Home
              {selectedMenu === "home" && <IoMdArrowDropright className="ml-auto font-bold" />}
            </li>
            <li
              onClick={() => setSelectedMenu("category")}
              className={`cursor-pointer p-2 flex items-center ${
                selectedMenu === "category" ? "bg-[#FFF8B7]" : ""
              }`}
            >
              <CategoryIcon />
              Category
              {selectedMenu === "category" && <IoMdArrowDropright className="ml-auto font-bold" />}
            </li>
            <li
              onClick={() => setSelectedMenu("products")}
              className={`cursor-pointer p-2 flex items-center ${
                selectedMenu === "products" ? "bg-[#FFF8B7]" : ""
              }`}
            >
              <ProductIcon />
              Products
              {selectedMenu === "products" && <IoMdArrowDropright className="ml-auto font-bold" />}
            </li>
          </ul>
        </div>
        <div className="right md:col-span-3">
          {selectedMenu === "home" && <WelcomePage />}
          {selectedMenu === "category" && <CategoryPage onAddNewClick={() => setSelectedMenu("new-category")} />}
          {selectedMenu === "products" && <ProductsPage onAddNewClick={() => setSelectedMenu("new-product")} />}
          {/* {selectedMenu === "new-category" && <NewCategoryPage />} */}
          {selectedMenu === "new-product" && <ProductItem />}
        </div>
      </section>
    </>
  );
};

export default Home;

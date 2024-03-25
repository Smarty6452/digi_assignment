// Layout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children, selectedMenu, setSelectedMenu }) => {
  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar selectedMenu={selectedMenu} onMenuItemClick={handleMenuItemClick} />
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;

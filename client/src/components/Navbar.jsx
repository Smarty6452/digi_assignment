import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducer/UserSlice.js";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoIosWarning } from "react-icons/io";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  // State to manage dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <nav className="bg-[#662671] h-18 px-6 py-4 flex justify-between items-center relative">
      {/* Left side logo */}
      <div>
        <Link to="/" className="text-xl text-white">
          <span className="font-bold">digital</span>
          flake
        </Link>
      </div>

      <div className="flex items-center space-x-4 mr-6">
        <button
          className="text-white relative"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <FaRegCircleUser className="h-8 w-8" />

          {dropdownVisible && isLoggedIn ? (
            <div className="absolute top-full -left-6 mt-8">
              <button
                className="px-3 py-1 text-sm bg-transparent border border-[#B13129] text-[#B13129] rounded"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          ) : null}
        </button>
      </div>
      <Dialog
        maxWidth="xl"
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          className="flex mx-auto justify-center items-center gap-2 text-sm"
          id="responsive-dialog-title"
        >
          <IoIosWarning className="text-red-500" />{" "}
          <p className="text-md">Logout</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray">
            Are you sure you want to log out ?
          </DialogContentText>
        </DialogContent>
        <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={handleDialogClose}
            className="border  text-md text-primary p-2 px-5 rounded-[40px]"
          >
            Cancel{" "}
          </button>
          <button
            className="border text-white text-md bg-primary p-2 px-5 rounded-[40px]"
            onClick={handleLogout}
          >
            Continue{" "}
          </button>
        </div>
      </Dialog>
    </nav>
  );
};

export default Navbar;

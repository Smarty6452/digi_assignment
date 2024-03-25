import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducer/UserSlice";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(formData));
      if (
        response.payload.message === "User not found" ||
        response.payload.message === "Invalid password"
      ) {
        alert("Invalid email or password. Please try again.");
      } else {
        // Save token to local storage
        localStorage.setItem("token", response.payload.token);
        console.log(localStorage.getItem('token'));
        // console.log(localStorage);

        alert("Login successful!");

        history("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotPasswordClick = () => {
    setForgotPasswordDialogOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordDialogOpen(false);
  };

  const handleForgotPasswordSubmit = () => {
    setForgotPasswordDialogOpen(false);
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="flex  items-center h-screen mx-10">
      <div className="absolute inset-0 bg-hero-pattern bg-no-repeat bg-cover bg-center z-10 "></div>

      <div className="absolute inset-0 bg-white opacity-50 z-20"></div>
      <div className="bg-white shadow-xl rounded-lg p-8 w-1/3">
        <form
          onSubmit={handleSubmit}
          className=" relative z-20  bg-white rounded-lg shadow-xl p-8 w-[500px]"
        >
          <div className="mb-4">
            <div className="text-center mb-8">
              <img
                src="https://s3-alpha-sig.figma.com/img/9e94/6a94/4ef20bfd62fdde437d3084005e68980d?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f3k7BbLS1ZCOyhtNEu1X~mFsKmPn~9AvZtoKq9u~tIkrDJakrQR95wr~x7Iu41r16AIE0QzkD0ECT3tlIcnX88aONIqMlmR3udv2tMlJhKDhbtCqEwG5SBrhBTFdoX3rl-MQ-2OHrU8N9IyL~dsiIkbUTDwcXZ6z9v-9zxp2F~3puBaBIGS0~iPJHDQC8yVXCB72dExnc4Pok2teadkqPkMpjsweuS9KMFlUbakN4wvJaE7HXsFi72SDO7X4EfsENMp8Dx9BhUdftMMv0qNZy5w8LhrT3mo6UHuiTIzEOSBef10RHcnsEaxXenzPtjGW1iJIRNBbwjIHygmLTdNbVQ__"
                alt="Logo"
                className="inline-block w-28 "
              />
              <h2 className="text-md text-gray">
                Welcome to digitalflake Admin
              </h2>
            </div>
            <TextField
              fullWidth
              id="outlined-email"
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="outlined-password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <span
                    className="absolute -right-0 mr-2 opacity-70"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                ),
              }}
            />
          </div>
          <div className="text-center flex justify-between mt-4 text-gray">
            <div>
              <span className="text-xs">
                Don't have an account?{" "}
                <Link to="/" className="text-primary opacity-80">
                  Sign Up
                </Link>
              </span>
            </div>

            <div>
              <Link
                to="#"
                className="text-primary opacity-80 text-xs"
                onClick={handleForgotPasswordClick}
              >
                Forget Password ?
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <button
              className="w-full mt-16 bg-[#5C218B] p-4 text-white rounded-lg font-medium"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Dialog
        fullWidth
        open={forgotPasswordDialogOpen}
        onClose={handleForgotPasswordClose}
      >
        <DialogTitle textAlign={"center"} className="text-primary">
          Did you forget your password?
        </DialogTitle>
        <DialogContentText align="center">
          Enter your email address and we'll send you a link to restore password
        </DialogContentText>
        <DialogContent className="mt-2 mx-10">
          <TextField
            fullWidth
            id="outlined-email"
            label="Enter your email address"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions className="mx-14">
          <Button
            className="w-full "
            onClick={handleForgotPasswordSubmit}
            variant="contained"
            style={{
              backgroundColor: "#5C218B",
              color: "white",
              padding: "10px",
            }}
          >
            Request Password Reset
          </Button>
        </DialogActions>
        <DialogActions className="mx-14">
          <Link
            onClick={handleForgotPasswordSubmit}
            className="text-gray underline text-sm mb-4"
          >
            Back to , Log In
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;

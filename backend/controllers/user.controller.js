import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT
import dotenv from 'dotenv';

dotenv.config();

export const getAlluser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User Already Exist " });
  }

  const hashedpassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedpassword,
  });

  let token; // Define token variable here

  try {
    await user.save();
    token = generateToken(user._id); // Assign token value here
    console.log("created", user);
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ user, token }); // Include token in the response object
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Login request received:", email, password); // Debugging

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Couldn't find user with this email" });
  }

  console.log("Existing user:", existingUser); // Debugging

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  console.log("Is password correct:", isPasswordCorrect); // Debugging
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = generateToken(existingUser._id);

  // At this point, login is successful
  res.status(200).json({ user: existingUser, token });
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
};

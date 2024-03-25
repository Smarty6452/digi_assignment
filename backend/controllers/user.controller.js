// controllers/user.controller.js

import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const getAlluser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("User created:", user);
    res.status(201).json({ user });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to send reset email" });
      } else {
        console.log('Reset email sent:', info.response);
        res.status(200).json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    next(error); 
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findById(decodedToken.userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword);

    existingUser.password = hashedNewPassword;

    await existingUser.save();
    console.log('Password updated');
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error); 
  }
};

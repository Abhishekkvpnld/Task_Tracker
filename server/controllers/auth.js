import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign-up function to create a new user
export const signUp = async (req, res) => {
  try {
    const { username, email, password, country } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists 🤦",
      });
    }

    // Check for required fields
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Please provide a username 🤦",
      });
    }

    if (!country) {
      return res.status(400).json({
        success: false,
        message: "Please provide a country 🤦",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email 🤦",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a password 🤦",
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user payload
    const userPayload = {
      username,
      email,
      password: hashedPassword,
      country,
    };

    // Create and save the new user
    const newUser = new userModel(userPayload);
    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully 🎉🎉",
      data: savedUser,
      error: false,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the user.",
      error: true,
    });
  }
};

// Login function to authenticate a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email 🤦",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a password 🤦",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found 🤦",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password 🤦",
      });
    }   

    // Generate JWT token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h", // 24 hours expiration
    });

    // Set cookie options
    const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite:"None"
    };

    // Send the response with the token
    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Logged in successfully 🎉",
      data: user,
      error: false,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred during login.",
      error: true,
    });
  }
};

//Logout function
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully 🎉",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout.",
      error: true,
    });
  }
};

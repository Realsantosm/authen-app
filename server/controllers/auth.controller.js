const generateAuthToken = require("../config/token");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;
    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      userName: userName,
    });

    // Generate auth token
    let token;
    try {
      token = await generateAuthToken(user._id);
    } catch (err) {
      console.error("Error generating auth token:", err);
      return res
        .status(500)
        .json({ message: "Internal server error in generating token." });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production", // Set to true if using HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error during sign up:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User does not already" });
    }
    const matchedPassword = await bcrypt.compare(password, existUser.password);
    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    // Generate auth token
    let token;
    try {
      token = await generateAuthToken(existUser._id);
    } catch (err) {
      console.error("Error generating auth token:", err);
      return res
        .status(500)
        .json({ message: "Internal server error in generating token." });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production", // Set to true if using HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User LoggedIn successfully",
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        userName: existUser.userName,
        password: existUser.password, // Avoid sending password in response
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production", // Set to true if using HTTPS
      sameSite: "strict",
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signUp,
  logIn,
  logOut,
};

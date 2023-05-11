const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc     Register Users
// @route    POST | 'api/users'
// @access   PUBLIC
const registerUser = expressAsyncHandler(async (req, res) => {
  //Destructuring our needed field from the req.body and check if there are not null
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Fields");
  }

  // Check if user exist already
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Account Already Registered");
  }

  // Hash The User's Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc     Authenicate new Users
// @route    POST | 'api/users/login'
// @access   PUBLIC
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const confirmPassaword =
    user && (await bcrypt.compare(password, user.password));

  if (user && confirmPassaword) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Details");
  }
});

// @desc     Users Data
// @route    GET | 'api/users/me'
// @access   PRIVATE
const getMe = expressAsyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    _id,
    name,
    email,
  });
});

//Generate Json Web Token using JWT

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

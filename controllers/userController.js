const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
var passwordHash = require("password-hash");

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  console.log(userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  var hashedPassword = passwordHash.generate(password);
  console.log(hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "register the user" });
});

//@desc login
//@route POST /api/users/login
//@access public
const loginUser = asynchandler(async (req, res) => {
  res.json({ message: "login user" });
});

//@desc current user info
//@route POST /api/users/current
//@access private
const currentUser = asynchandler(async (req, res) => {
  res.json({ message: "current user information" });
});

module.exports = { registerUser, loginUser, currentUser };

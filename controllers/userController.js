const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

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
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  var hashedPassword = passwordHash.generate(password);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await passwordHash.verify(password, user.password))) {
    console.log("ato");
    console.log("user:", user);
    const accessToken = jwt.sign(
      {
        //tsy alefa anay payload ny password
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" } //expiration du token
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  res.json({ message: "login user" });
});

//@desc current user info
//@route POST /api/users/current
//@access private
const currentUser = asynchandler(async (req, res) => {
  res.json({ message: "current user information" });
});

module.exports = { registerUser, loginUser, currentUser };

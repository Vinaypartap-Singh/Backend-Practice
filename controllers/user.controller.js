const User = require("../models/user.model.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const registerUser = async (req, res) => {
  const { name, displayName, email, password } = req.body;

  if (!name || !displayName || !email || !password) {
    return res.status(400).json({ message: "Please Fill All The Details" });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(409, "User Already Exist.");
  }

  const profileLocalPath = req?.files.profileImage[0].path;

  if (!profileLocalPath) {
    return res.status(400).json({ message: "Profile Image is required" });
  }

  const profileImage = await uploadOnCloudinary(profileLocalPath);

  if (!profileImage) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  const user = await User.create({
    name: name,
    displayName: displayName,
    email: email,
    password: password,
    profileImage: profileImage.url,
  });

  return res.status(200).json({ message: "User Created Successfully." });
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Details" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400, "User does not exist");
  }

  const token = await user.generateToken(user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password not correct" });
  }

  return res.status(200).json({ message: "Login Successfull", token: token });
};

module.exports = { registerUser, logInUser };

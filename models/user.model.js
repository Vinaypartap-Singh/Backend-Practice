const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../constants/constant");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      min: [5, "display name must be 5 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      min: [8, "Password must be 8 characters or more"],
      required: [true, "Password is required"],
    },
    profileImage: {
      type: String, // Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function (id) {
  return jwt.sign({ id: id }, tokenSecret, { expiresIn: "30d" });
};

const User = new mongoose.model("User", userSchema);

module.exports = User;

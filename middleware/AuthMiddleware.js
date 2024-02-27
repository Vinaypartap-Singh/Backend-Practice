const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../constants/constant");
const User = require("../models/user.model");

const verifyJWT = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, tokenSecret);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.log("Error in verifyJWT: ", error);
  }
};

module.exports = verifyJWT;

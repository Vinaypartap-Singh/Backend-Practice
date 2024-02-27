const { Router } = require("express");
const { registerUser, logInUser } = require("../controllers/user.controller");
const { upload } = require("../middleware/multer.middleware.js");

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "profileImage", maxCount: 1 }]), registerUser);
router.route("/login").post(logInUser);

module.exports = router;

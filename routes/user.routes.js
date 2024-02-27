const { Router } = require("express");
const { registerUser, logInUser } = require("../controllers/user.controller");

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);

module.exports = router;

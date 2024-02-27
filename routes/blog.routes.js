const { Router } = require("express");
const verifyJWT = require("../middleware/AuthMiddleware");
const {
  uploadBlog,
  getAllBlogs,
  getUserBlogs,
} = require("../controllers/blog.controller");
const router = Router();

router.route("/uploadBlog").post(verifyJWT, uploadBlog);
router.route("/getallblogs").get(getAllBlogs);
router.route("/getuserblogs").get(verifyJWT, getUserBlogs);

module.exports = router;

const { Router } = require("express");
const verifyJWT = require("../middleware/AuthMiddleware");
const {
  uploadBlog,
  getAllBlogs,
  getUserBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const router = Router();

router.route("/uploadBlog").post(verifyJWT, uploadBlog);
router.route("/getallblogs").get(getAllBlogs);
router.route("/getuserblogs").get(verifyJWT, getUserBlogs);
router.route("/updateblog/:id").put(verifyJWT, updateBlog);
router.route("/deleteblog/:id").delete(verifyJWT, deleteBlog);

module.exports = router;

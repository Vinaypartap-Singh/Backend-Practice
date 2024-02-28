const Blog = require("../models/blog.model");

const uploadBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing Details for Blogs" });
  }

  const blog = await Blog.create({
    title: title,
    content: content,
    user: req.user._id,
  });

  if (!blog) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.status(200).json({ message: "Blog Uploaded Successfully" });
};

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  if (!blogs) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  res.status(200).json({ blogs });
};

const getUserBlogs = async (req, res) => {
  const blogs = await Blog.find({ user: req.user._id });

  if (!blogs) {
    return res.send(401).json({ message: "No Blogs Found" });
  }

  res.status(200).json({ blogs });
};

const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.findOne({ _id: req.params.id });

  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!blog) {
    return res.status(400).json({ message: "No Blog Found" });
  }

  await Blog.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: title,
        content: content,
      },
    }
  );

  res.status(200).json({ message: "Blog Updated Successfully" });
};

module.exports = { uploadBlog, getAllBlogs, getUserBlogs, updateBlog };

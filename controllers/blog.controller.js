const Blog = require("../models/blog.model");

const uploadBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Missing Details for Blogs" });
    }

    const blog = await Blog.create({
      title: title,
      content: content,
      category: category,
      user: req.user._id,
    });

    if (!blog) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json({ message: "Blog Uploaded Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Check all the details" });
  }
};

const getAllBlogs = async (req, res) => {
  const { category, sort } = req.query;

  const queryObject = {};

  if (category) {
    queryObject.category = category;
  }

  // FIND DATA USING QUERY OBJECT AND OPTIONS

  apiData = Blog.find(queryObject);

  // DATA SORTING FUNCTIONALLITY
  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = await apiData.sort(sortFix);
  }

  const blogs = await apiData;

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

const deleteBlog = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });

  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!blog) {
    return res.status(400).json({ message: "No Blog Found" });
  }

  await Blog.deleteOne({ id: req.params.id });

  res.status(200).json({ message: "Blog Deleted Successfully" });
};

module.exports = {
  uploadBlog,
  getAllBlogs,
  getUserBlogs,
  updateBlog,
  deleteBlog,
};

const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes.js");
const blogRouter = require("./routes/blog.routes.js");
const connectDB = require("./db/db.js");

// default middlewares
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// User Routes
app.use("/api/users", userRouter);
app.use("/api/blog", blogRouter);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error index file ", error);
    });
    app.listen(PORT, () => {
      console.log("Server has started");
    });
  })
  .catch((error) => {
    console.log("MONGO CONNECTION FAILED: ", error);
  });

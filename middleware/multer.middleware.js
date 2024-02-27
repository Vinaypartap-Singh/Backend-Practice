const multer = require("multer");

const storage = multer.diskStorage({
  // multer is used for fileupload
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };

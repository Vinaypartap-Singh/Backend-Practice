const v2 = require("cloudinary");
const fs = require("fs");

v2.config({
  cloud_name: "diffsw2hx",
  api_key: "192446945929831",
  api_secret: "GkECw9riuiwP2EorOuakQyBJKSM",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary

    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully

    console.log("File has uploaded on cloudinary ", response);

    // Unlink file from local after success upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // This method will remove the locally saved temporary file when the file upload is failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = { uploadOnCloudinary };

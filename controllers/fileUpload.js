const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
exports.localFileUpload = (req, res) => {
  console.log("123");
  try {
    console.log("567");
    if (!req.files || !req.files.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const file = req.files.file;
    console.log("file aagyi", file);
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Error moving file" });
      }
      res.json({
        success: true,
        message: "Local file uploaded successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
};
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  console.log("temp file path: " + file.tempFilePath);
  if (quality) {
    options.quality = quality;
    console.log("quality: " + quality);
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation

    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type: " + fileType);
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid file type supported" });
    }

    //file format supported
    console.log("uploading to firsttime");
    const response = await uploadFileToCloudinary(file, "firsttime");
    console.log(response);
    //save to database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageURL: response.secure_url,
    });

    res.json({
      success: true,
      imgURL: response.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error uploading image" });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    console.log(name, email, tags);
    const file = req.files.videoFile;

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);
    //add a upper limit of 5MB
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid video type supported" });
    }
    console.log("uploading video");
    const response = await uploadFileToCloudinary(file, "firsttime");
    console.log(response);

    const fileData = await File.create({
      name,
      email,
      tags,
      imgURL: response.secure_url,
    });
    res.json({
      success: true,
      imgURL: response.secure_url,
      message: "Video uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error uploading video" });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation

    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type: " + fileType);
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid file type supported" });
    }

    //file format supported
    console.log("uploading to firsttime");
    //homework - make it reduce by height
    const response = await uploadFileToCloudinary(file, "firsttime", 10);
    console.log(response);
    //save to database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageURL: response.secure_url,
    });

    res.json({
      success: true,
      imgURL: response.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error uploading image" });
  }
};

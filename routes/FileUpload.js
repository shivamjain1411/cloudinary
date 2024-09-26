const express = require("express");
const router = express.Router();
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer,
} = require("../controllers/fileUpload");

console.log("asdf upload");
router.post("/localFileUpload", localFileUpload);
console.log("asdf jhgupload");
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);
module.exports = router;

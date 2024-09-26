const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
//middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//db connect
const db = require("./config/database");
db.connect();

//cloudinary connect
const cloudinary = require("./config/Cloudinary");
cloudinary.cloudinaryConnect();

//route mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // server is listening on port 3000
});

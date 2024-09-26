const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Connected to database"))
    .catch((error) => {
      console.log("Error connecting");
      console.error(error);
      process.exit(1);
    });
};

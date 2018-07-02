require("dotenv").config();
const mongoose = require("mongoose");

// database
const db = mongoose.connect(
  `${process.env.MONGODB_URI}${process.env.DB_NAME}`,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to database..");
  }
);

module.exports = db;

require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");

router.post("/register", (req, res) => {
  const { email, password, userName } = req.body;
  const emailFormat = /\S+@\S+\.\S+/;

  if (!emailFormat.test(email)) {
    return res.status(400).json({
      code: res.statusCode,
      message: "Format email anda salah!",
      data: null,
    });
  }

  const newUser = new User({
    email: email,
    password: password,
    userName: userName,
  });

  User.find({ email: email }, (err, results) => {
    if (err) {
      return res.status(500).json({
        code: res.statusCode,
        message: err.message,
      });
    } else if (results && results.length > 0) {
      return res.status(409).json({
        code: res.statusCode,
        message: "Email sudah terdaftar!",
      });
    } else {
      newUser.save((err) => {
        if (err) {
          return res.status(500).json({
            code: res.statusCode,
            message: err.message,
          });
        } else {
          return res.status(409).json({
            code: res.statusCode,
            message: "Berhasil membuat akun!",
          });
        }
      });
    }
  });
});

module.exports = router;

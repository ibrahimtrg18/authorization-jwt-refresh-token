require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

router.post("/", verifyToken, (req, res) => {
  const { name, price, value } = req.body;

  const newProduct = new Product({
    name,
    price,
    value,
  });
  newProduct.save((err) => {
    if (err) return res.status(500).send(err);
    else {
      return res.status(200).json({
        code: req.statusCode,
        message: "Berhasil membuat product!",
      });
    }
  });
});

router.get("/:productId", verifyToken, (req, res) => {
  const productId = req.params.productId;

  Product.find({ _id: productId }, (err, results) => {
    if (err) return res.status(500).send(err);
    else if (results && results.length > 0) {
      return res.status(200).json({
        code: req.statusCode,
        data: results[0],
        user: req.payload,
      });
    } else {
      return res.status(404).json({
        code: res.statusCode,
        message: "Product tidak ditemukan!",
      });
    }
  });
});

function verifyToken(req, res, next) {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(401).json({
      code: req.statusCode,
      message: "invalid token",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
    if (err) {
      return res.status(401).json({
        code: req.statusCode,
        message: err.message,
      });
    } else {
      req.payload = payload;
      next();
    }
  });
}

module.exports = router;

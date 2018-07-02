require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const redis = require("redis");
const UserSchema = require("../models/User");

const client = redis.createClient(process.env.DB_REDIS);

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserSchema.find(
    { email: email.toLowerCase(), password: password.toLowerCase() },
    (err, results) => {
      if (err) return res.status(500).send();
      else if (results && results.length > 0) {
        const accessToken = generateToken(results[0]);
        const refreshToken = jwt.sign(
          { payload: results[0] },
          process.env.REFRESH_TOKEN
        );
        client.setex(refreshToken, 60, accessToken);
        return res.status(200).json({
          code: res.statusCode,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        return res.status(409).json({
          code: res.statusCode,
          message: "Cek kembali email dan password!",
        });
      }
    }
  );
});

router.post("/token", (req, res) => {
  const refreshToken = req.headers["x-token"];

  if (!refreshToken) return res.status(401).send();
  client.get(refreshToken, (err, data) => {
    if (err) return res.status(500).send();
    if (data != null) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
        const newAccessToken = generateToken(payload);
        if (err) return console.log(err);
        else {
          return res.status(200).json({
            code: res.statusCode,
            accessToken: newAccessToken,
          });
        }
      });
    } else {
      return res.status(403).json({
        code: res.statusCode,
      });
    }
  });
});

function generateToken(payload) {
  return jwt.sign({ payload: payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "15s",
  });
}

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    photo: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    identity: {
      type: String,
      default: null,
    },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    transaction: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

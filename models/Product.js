const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },
  price: {
    required: true,
    trim: true,
    type: String,
  },
  value: {
    required: true,
    type: String,
  },
  photo: [],
  type: String,
  tag: String,
  size: [],
  rated: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      comment: String,
      photo: String,
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);

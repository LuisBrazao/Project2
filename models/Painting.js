const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const paintingSchema = new Schema(
  {
    title: {
      type: String,
      unique: true
    },
    author: {
      type: String,
      unique: true,
    },
    image_url: {
      type: String,
    },
    price: {
      type: Number
    },
    paintedIn: {
      type: Number
    },
    total: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    canSell: {
      type: Boolean,
      default: true
    }
  }
)

module.exports = model("Painting", paintingSchema)


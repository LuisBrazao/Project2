const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    image_url: {
      type: String,
    },
    money: {
      type: Number,
      default: 100000

    },
    owened: [{
      paintingID: {
      type: Schema.Types.ObjectId,
      ref: "Painting"
      }
    }],
    wishlist: [{
      paintingID: {
      type: Schema.Types.ObjectId,
      ref: "Painting"
      }
    }],
    selling: [{
      auctionID: {
      type: Schema.Types.ObjectId,
      ref: "Auction"
      }
    }],
    trades: [{
      tradeID: {
      type: Schema.Types.ObjectId,
      ref: "Trade"
      }
    }]
  }
)

module.exports = model("User", userSchema)


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
      required: [true, "Image is required"]
    },
    money: {
      type: Number,
      default: 100000

    },
    userCollection: [{
      type: Schema.Types.ObjectId,
      ref: "Painting"
    }],
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: "Painting"
    }],
    selling: [{
      type: Schema.Types.ObjectId,
      ref: "Auction"
    }],
    trades: [{
      type: Schema.Types.ObjectId,
      ref: "Trade"
    }]    
  }
)

module.exports = model("User", userSchema)


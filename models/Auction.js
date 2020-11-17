const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const auctionSchema = new Schema(
  {
    selling: {
      type: Schema.Types.ObjectId,
      ref: "Painting"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    currentBid: {
      type: Schema.Types.ObjectId,
      ref: "Bid"
    },
    startPrice: {
      type: Number
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    }
  }
)

module.exports = model("Auction", auctionSchema)


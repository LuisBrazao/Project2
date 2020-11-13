const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const auctionSchema = new Schema(
  {
    selling: [{
      type: Schema.Types.ObjectId,
      ref: "Painting"
    }],
    currentBid: {
      type: Schema.Types.ObjectId,
      ref: "Bid"
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


const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const tradeSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    requesting: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    offering: [{
      paintingID: {
      type: Schema.Types.ObjectId,
      ref: "Painting"
      }
    }],
    wanting: [{
      paintingID: {
      type: Schema.Types.ObjectId,
      ref: "Painting"
      }
    }]
  }
)

module.exports = model("Auction", tradeSchema)


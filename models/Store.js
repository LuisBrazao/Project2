const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const storeSchema = new Schema(
  {
    selling: [{
      paintingID: {
      type: Schema.Types.ObjectId,
      ref: "Painting"
      }
    }],
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    }
  }
)

module.exports = model("Store", storeSchema)


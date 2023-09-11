const mongoose = require("mongoose");

//Modelo de una empresa
const historySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, uniqued: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    documentNumber: {
      type: Number,
      required: true,
      ref: "User",
      localField: "documentNumber",
      foreignField: "documentNumber",
    },
  },
  { collection: "History" }
);

const History = mongoose.model("History", historySchema);

module.exports = History;

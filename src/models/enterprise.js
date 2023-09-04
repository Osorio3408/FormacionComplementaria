const mongoose = require("mongoose");

//Modelo de una empresa
const enterpriseSchema = new mongoose.Schema(
  {
    nameEnterprise: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    cellphoneNumberEnterprise: { type: Number, required: true },
    cityEnterprise: { type: String, required: true },
    nit: { type: String, required: true, unique: true },
  },
  { collection: "Enterprise" }
);

const Enterprise = mongoose.model("Enterprise", enterpriseSchema);

module.exports = Enterprise;

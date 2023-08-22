const mongoose = require("mongoose");
const { hashPassword } = require("../utils/bycript");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cellphoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
  },
  { collection: "Company" }
);

// Antes de guardar el usuario, encripta la contraseña
companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await hashPassword(this.password); // Usa la función de utilidad
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

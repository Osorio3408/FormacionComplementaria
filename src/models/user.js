const mongoose = require("mongoose");
const { hashPassword } = require("../utils/bycript");

//Modelo de un usuario (ENCARGADO, ADMIN, EMPLEADO, INSTRUCTOR)
const userSchema = new mongoose.Schema(
  {
    nameUser: { type: String, required: true },
    documentType: { type: String, required: true },
    documentNumber: { type: Number, required: true, unique: true },
    cellphoneNumberUser: { type: Number, required: true },
    emailUser: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true },
    nit: { type: String, ref: "Enterprise" }, // Referencia a la Empresa
    passwordRecoveryToken: { type: String }, // Agregar este campo
  },
  { collection: "User" }
);

// Antes de guardar el usuario, encripta la contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await hashPassword(this.password); // Usa la función de utilidad
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

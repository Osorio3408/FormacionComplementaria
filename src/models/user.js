const mongoose = require("mongoose");
const { hashPassword } = require("../utils/bycript");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cellphoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
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

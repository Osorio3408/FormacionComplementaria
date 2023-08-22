const bcrypt = require("bcrypt");

// Función para encriptar una contraseña
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
};

// Función para generar un token de recuperación de contraseña de 4 números aleatorios
const generateRecoveryToken = () => {
  // Genera 4 números aleatorios entre 1000 y 9999
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  return token;
};

module.exports = {
  generateRecoveryToken,
};

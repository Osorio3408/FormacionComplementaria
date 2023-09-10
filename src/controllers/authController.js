const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Enterprise = require("../models/enterprise");
const { generateRecoveryToken } = require("../utils/jwtUtils");
const transporter = require("../utils/emailSender");
const { hashPassword } = require("../utils/bycript");

//Función para validar las credencias e iniciar sesión
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  try {
    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ emailUser: email });
    const enterprise = await Enterprise.findOne({ nit: user.nit });
    // console.log(user);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Correo electrónico o contraseña incorrectos" });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas PASSWORD" });
    }

    // Generar un token JWT con más información del usuario
    const token = jwt.sign(
      {
        userId: user.documentNumber,
        name: user.nameUser,
        email: user.emailUser,
        rol: user.rol,
        nit: user.nit,
        nameEnterprise: enterprise.nameEnterprise,
        cellphoneNumberUser: user.cellphoneNumberUser,
      },
      "mi_secreto_supersecreto",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Función para enviar un correo electrónico de recuperación de contraseña
const sendPasswordRecoveryEmail = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  try {
    // Busca al usuario por su dirección de correo electrónico
    const user = await User.findOne({ emailUser: email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Genera un token de recuperación de contraseña que incluye el ID del usuario
    const recoveryToken = generateRecoveryToken(); // Implementa esta función

    const recoveryUrl = `http://localhost:5173/ResetPassword/${recoveryToken}`;

    // Guarda el token en la base de datos o en una memoria temporal asociado al usuario
    user.passwordRecoveryToken = recoveryToken;
    await user.save();

    // Configura el correo electrónico
    const mailOptions = {
      from: "senacursoscomplentarios2@gmail.com", // Reemplaza con tu dirección de correo electrónico
      to: email,
      subject: "Recuperación de Contraseña",
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${recoveryUrl}`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Correo electrónico de recuperación enviado exitosamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al enviar el correo electrónico de recuperación.",
    });
  }
};

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Buscar al usuario por el token de recuperación
    const user = await User.findOne({ passwordRecoveryToken: token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Token de recuperación inválido." });
    }

    // Actualizar la contraseña del usuario
    user.password = password;
    user.passwordRecoveryToken = null; // Elimina el token de recuperación

    await user.save();

    res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al restablecer la contraseña." });
  }
};

// Agrega las funciones en la exportación para poder usarlas
module.exports = {
  signIn,
  sendPasswordRecoveryEmail,
  resetPassword,
};

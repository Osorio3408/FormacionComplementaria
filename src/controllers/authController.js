const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Enterprise = require("../models/enterprise");

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

// Agrega las funciones en la exportación para poder usarlas
module.exports = {
  signIn,
};

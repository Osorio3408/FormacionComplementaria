const User = require("../models/user");
const transporter = require("../utils/emailSender");

//Función para crear un EMPLEADO
const createUser = async (req, res) => {
  try {
    const {
      nameUser,
      documentType,
      documentNumber,
      cellphoneNumberUser,
      emailUser,
      password,
      rol,
      nit,
    } = req.body;
    const user = new User({
      nameUser,
      documentType,
      documentNumber,
      cellphoneNumberUser,
      emailUser,
      password,
      rol,
      nit,
    });
    await user.save();

    // Configuración del correo de notificación
    const mailOptions = {
      from: user.email,
      to: user.email,
      subject: "Cuenta creada exitosamente",
      text: "¡Tu cuenta ha sido creada exitosamente!",
    };

    // Enviar correo de notificación
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo de notificación enviado:", info.response);
      }
    });

    res.status(201).send("Usuario creado exitosamente!");
  } catch (error) {
    res.status(400).send(error);
  }
};

const findUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  findUsers,
};

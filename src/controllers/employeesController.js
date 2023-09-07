const User = require("../models/user");
const transporter = require("../utils/emailSender");

// Función para crear empleados
const createEmployee = async (userData) => {
  try {
    const {
      nameUser,
      documentType,
      documentNumber,
      cellphoneNumberUser,
      emailUser,
      password,
      nit,
      rol,
    } = userData;
    const user = new User({
      nameUser,
      documentType,
      documentNumber,
      cellphoneNumberUser,
      emailUser,
      password,
      nit,
      rol,
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
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
};

// Función para cargar usuarios desde un archivo Excel
const uploadUsers = async (req, res) => {
  try {
    const usersData = req.body;
    for (const userData of usersData) {
      await createEmployee(userData);
    }
    res.status(201).send("Usuarios creados exitosamente!");
  } catch (error) {
    res.status(400).send(error);
  }
};

//Lista toodos los empleados de una empresa por el id de la empresa
const listEmployeesByCompany = async (req, res) => {
  try {
    const { nit } = req.params; // O req.query según corresponda

    console.log(req.params);

    console.log(nit);

    // Validar que nit sea un valor válido, por ejemplo, una cadena no vacía
    if (!nit) {
      return res.status(400).json({ error: "nit es requerido" });
    }

    const users = await User.find({
      rol: "Employee",
      nit: nit,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Lista toodos los empleados sin empresa
const listEmployeesWithoutCompany = async (req, res) => {
  try {
    const users = await User.find({
      rol: "Employee",
      nit: "",
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Lista un solo empleado por el número de documento
const getEmployeed = async (req, res) => {
  try {
    const { documentNumber } = req.params;

    if (!documentNumber) {
      return res
        .status(400)
        .json({ error: "El número de documento es requerido" });
    }

    const employeed = await User.find({
      documentNumber: documentNumber,
    });
    res.status(200).json(employeed);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Endpoint para asignar un NIT a un empleado
const assignNITToEmployee = async (req, res) => {
  try {
    const { documentNumber, nit } = req.body;

    if (!documentNumber || !nit) {
      return res
        .status(400)
        .json({ error: "Los campos documentNumber y nit son requeridos" });
    }

    // Encuentra al empleado por el número de documento
    const employee = await User.findOne({ documentNumber });

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Asigna el NIT al empleado
    employee.nit = nit;

    // Guarda los cambios en la base de datos
    await employee.save();

    res.status(200).json({ message: "NIT asignado correctamente" });
  } catch (error) {
    console.error("Error al asignar el NIT:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  uploadUsers,
  getEmployeed,
  listEmployeesByCompany,
  listEmployeesWithoutCompany,
  assignNITToEmployee,
};

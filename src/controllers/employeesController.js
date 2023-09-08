const Course = require("../models/Course");
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

// Función para editar un empleado por número de documento
const editEmployee = async (req, res) => {
  try {
    const { documentNumber } = req.params; // Obtén el número de documento desde los parámetros de la URL
    const updatedEmployeeData = req.body; // Obtén los nuevos datos del empleado desde el cuerpo de la solicitud

    if (!documentNumber) {
      return res
        .status(400)
        .json({ error: "El número de documento es requerido" });
    }

    // Encuentra al empleado por el número de documento
    const employee = await User.findOne({ documentNumber });

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Actualiza los campos del empleado con los nuevos datos
    employee.nameUser = updatedEmployeeData.nameUser;
    employee.cellphoneNumberUser = updatedEmployeeData.cellphoneNumberUser;
    employee.emailUser = updatedEmployeeData.emailUser;

    // Guarda los cambios en la base de datos
    await employee.save();

    res.status(200).json({ message: "Empleado editado correctamente" });
  } catch (error) {
    console.error("Error al editar el empleado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Función para eliminar un empleado por número de documento
const deleteEmployee = async (req, res) => {
  try {
    const { documentNumber } = req.params; // Obtén el número de documento desde los parámetros de la URL

    if (!documentNumber) {
      return res
        .status(400)
        .json({ error: "El número de documento es requerido" });
    }

    // Encuentra al empleado por el número de documento
    const employee = await User.findOne({ documentNumber });

    console.log(employee);

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Elimina al empleado de la base de datos
    await employee.deleteOne();

    res.status(200).json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para inscribir un usuario en un curso
const enrollUserInCourse = async (req, res) => {
  try {
    const { courseId } = req.params; // ID del curso al que se inscribe el usuario
    const { userId } = req.body; // Número de documento del usuario

    // Buscar el curso por su ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    // Verificar si el usuario ya está inscrito en el curso
    if (course.inscribed.includes(userId)) {
      return res
        .status(400)
        .json({ error: "El usuario ya está inscrito en este curso" });
    }

    course.inscribed.push(userId);
    course.course.inscribeedNumber++; // Incrementa el contador

    // Guardar los cambios en la base de datos
    await course.save();

    res
      .status(200)
      .json({ message: "Usuario inscrito en el curso correctamente" });
  } catch (error) {
    console.error("Error al inscribir al usuario en el curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para actualizar los datos de un empleado
const updateEmployeeData = async (req, res) => {
  try {
    const { userId } = req.params; // Obtén el número de documento desde los parámetros de la URL
    const updatedEmployeeData = req.body; // Obtén los nuevos datos del empleado desde el cuerpo de la solicitud

    console.log(userId);
    console.log(updatedEmployeeData);

    // Encuentra al empleado por el número de documento
    const employee = await User.findOne({ documentNumber: userId });

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    console.log(employee);

    // Actualiza los campos del empleado con los nuevos datos
    employee.nameUser = updatedEmployeeData.name;
    employee.cellphoneNumberUser = updatedEmployeeData.cellphoneNumberUser;
    employee.emailUser = updatedEmployeeData.email;

    // Guarda los cambios en la base de datos
    await employee.save();

    res
      .status(200)
      .json({ message: "Datos del empleado actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar los datos del empleado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Agrega las funciones en la exportación para poder usarlas
module.exports = {
  uploadUsers,
  getEmployeed,
  listEmployeesByCompany,
  listEmployeesWithoutCompany,
  assignNITToEmployee,
  editEmployee,
  deleteEmployee,
  enrollUserInCourse,
  updateEmployeeData,
};

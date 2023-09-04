const User = require("../models/user");
const Enterprise = require("../models/enterprise");

//Función para crear un Encargado de la empresa (CREAR ENCARGADO Y EMPRESA)
const createCompanyAndAssociateUser = async (req, res) => {
  try {
    const {
      nameUser,
      documentType,
      documentNumber,
      cellphoneNumberUser,
      emailUser,
      password,
      rol,
      nameEnterprise,
      address,
      cellphoneNumberEnterprise,
      cityEnterprise,
      nit,
    } = req.body;

    // Crear una nueva empresa
    const newEnterprise = new Enterprise({
      nameEnterprise,
      address,
      cellphoneNumberEnterprise,
      cityEnterprise,
      nit,
      // Otros campos de la empresa
    });

    // Guardar la empresa en la base de datos
    const savedEnterprise = await newEnterprise.save();

    // Crear un nuevo usuario
    const newUser = new User({
      nameUser,
      documentType,
      documentNumber,
      cellphoneNumberUser,
      emailUser,
      password,
      rol,
      nit: savedEnterprise.nit, // Asociar directamente el ID de la empresa al usuario
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "Empresa y usuario creados y asociados exitosamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la empresa y asociar al usuario",
      error,
    });
  }
};

module.exports = { createCompanyAndAssociateUser };

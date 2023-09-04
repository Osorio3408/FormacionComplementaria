const express = require("express");
const router = express.Router();
const Course = require("../models/Course"); // Importa el modelo de Course
const Enterprise = require("../models/enterprise");
const User = require("../models/user");

// Función para obtener todas las empresas
const getAllEmpresas = async (req, res) => {
  try {
    // const empresas = await Course.distinct("enterprise.nameEnterprise");
    const empresas = await Enterprise.find({
      nameEnterprise: { $ne: "SENA" },
    }).select("nameEnterprise");
    res.status(200).send(empresas);

    // res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las empresas" });
  }
};

// Función para obtener los detalles de una empresa y su manager
const getEmpresaDetails = async (req, res) => {
  const { nameEnterprise } = req.params;
  try {
    const empresa = await Enterprise.findOne({
      nameEnterprise: nameEnterprise,
    });

    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    // Buscar el manager en la colección de usuarios
    const manager = await User.findOne({
      nit: empresa.nit, // Supongo que el campo nit en User se refiere a la empresa
      rol: "manager", // Ajusta esto según tu modelo de datos
    });

    if (!manager) {
      return res.status(404).json({ message: "Manager no encontrado" });
    }

    res.json({
      enterprise: {
        ...empresa.toObject(),
        manager: {
          nameUser: manager.nameUser,
          cellphoneNumberUser: manager.cellphoneNumberUser,
          emailUser: manager.emailUser,
          // Agrega otros campos de manager aquí si es necesario
        },
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los detalles de la empresa" });
  }
};

// Controlador para crear un nuevo curso
const createCourse = async (req, res) => {
  try {
    const {
      nit,
      nameEnterprise,
      cityEnterprise,
      nameManager,
      cellphoneManager,
      emailManager,
      courseNumber,
      nameCourse,
      radicado,
      nis,
      instructor,
      responseDate,
      startDate,
      radicadoConfirmation,
      documentNumber,
      idState,
    } = req.body;

    // Aquí debes crear un nuevo objeto Course con los datos recibidos y guardarlo en la base de datos.

    // Ejemplo de cómo crear y guardar un nuevo curso:
    const newCourse = new Course({
      enterprise: {
        nit,
        nameEnterprise,
        cityEnterprise,
        manager: {
          nameManager,
          cellphoneManager,
          emailManager,
        },
      },
      course: {
        courseNumber,
        nameCourse,
        radicado,
        nis,
        instructor,
        responseDate,
        startDate,
        radicadoConfirmation,
      },
      idState,
      documentNumber,
    });

    await newCourse.save(); // Guarda el curso en la base de datos

    res.status(201).json({ message: "Curso creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el curso" });
  }
};

module.exports = { getAllEmpresas, getEmpresaDetails, createCourse };
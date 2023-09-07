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
      nameCourseAssigned,
      radicado,
      nis,
      instructor,
      responseDate,
      startDate,
      finishDate,
      radicadoConfirmation,
      documentNumber,
      inscribeedNumber,
      minRequirement,
      documentNumberTeacher,
      idState,
    } = req.body;

    // console.log(nit);
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
        nameCourseAssigned,
        radicado,
        nis,
        instructor,
        responseDate,
        startDate,
        finishDate,
        radicadoConfirmation,
        inscribeedNumber,
        minRequirement,
      },
      documentNumberTeacher,
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

//Función para listar los cursos y todos sus detalles.
const getCourses = async (req, res) => {
  try {
    // const empresas = await Course.distinct("enterprise.nameEnterprise");
    const courses = await Course.find();
    res.status(200).send(courses);

    // res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};
//Función para listar los cursos de una sola empresa
const getCoursesEnterprise = async (req, res) => {
  try {
    const { nit } = req.params;

    const courses = await Course.find({ "enterprise.nit": nit });
    res.status(200).send(courses);

    // res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};

//Función para editar un curso
const updateCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const updates = req.body; // Los datos que el cliente quiere actualizar
    // console.log(idCourse);
    // console.log(updates);

    // Busca el curso por su ID
    const course = await Course.findById(idCourse);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Actualiza solo los campos que se proporcionaron en la solicitud
    Object.keys(updates).forEach((key) => {
      course[key] = updates[key];
    });

    // Guarda los cambios en la base de datos
    await course.save();

    res.status(200).json({ message: "Curso actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el curso" });
  }
};

module.exports = {
  getAllEmpresas,
  getEmpresaDetails,
  createCourse,
  getCourses,
  getCoursesEnterprise,
  updateCourse,
};

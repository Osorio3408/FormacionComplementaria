const express = require("express");
const {
  getAllEmpresas,
  getEmpresaDetails,
  createCourse,
  getCourses,
  getCoursesEnterprise,
  updateCourse,
} = require("../controllers/courseController");

const router = express.Router();

//Ruta para obtener todas las empresas
router.get("/enterprises", getAllEmpresas);
//Ruta para obtener una sola empresa con el nombre de la empresa
router.get("/enterprise/:nameEnterprise", getEmpresaDetails);
//Ruta para crear un nuevo curso
router.post("/newCourse", createCourse);
//Ruta para obtener los cursos y sus detalles.
router.get("/getCourses", getCourses);
//Ruta para obtener los cursos y detalles de una sola empresa por su nit.
router.get("/getCoursesEnterprise/:nit", getCoursesEnterprise);
//Ruta para actualizar/modificar un curso.
router.put("/updateCourse/:idCourse", updateCourse);

module.exports = router;

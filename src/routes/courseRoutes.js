const express = require("express");
const {
  getAllEmpresas,
  getEmpresaDetails,
  createCourse,
} = require("../controllers/courseController");

const router = express.Router();

//Ruta para obtener todas las empresas
router.get("/enterprises", getAllEmpresas);
//Ruta para obtener una sola empresa con el nombre de la empresa
router.get("/enterprise/:nameEnterprise", getEmpresaDetails);
//Ruta para crear un nuevo curso
router.post("/newCourse", createCourse);

module.exports = router;

const express = require("express");
const { signIn } = require("../controllers/authController");
const {
  createCompany,
  findCompanys,
} = require("../controllers/companyController");

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/newCompany", createCompany);

// Ruta para obtener todos los usuarios
router.get("/getCompanys", findCompanys);

// Ruta para iniciar sesión
router.post("/signIn", signIn);

module.exports = router;

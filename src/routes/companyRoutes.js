const express = require("express");
const { signIn } = require("../controllers/authController");

const router = express.Router();

// Ruta para crear un nuevo usuario
// router.post("/newCompany", createCompany);

// Ruta para obtener todos los usuarios
// router.get("/getCompanys", findCompanys);

module.exports = router;

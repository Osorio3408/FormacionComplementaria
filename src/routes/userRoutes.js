const express = require("express");
const User = require("../models/user");
const { createUser, findUsers } = require("../controllers/userController");
const {
  createCompanyAndAssociateUser,
} = require("../controllers/managerController");
const { signIn } = require("../controllers/authController");
const {
  uploadUsers,
  listEmployeesByCompany,
  getEmployeed,
} = require("../controllers/employeesController");

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/newUser", createUser);

//Ruta para listar empleados de una empresa
router.get("/getEmployees/:nit", listEmployeesByCompany);

//Ruta para obtener los datos de un empleado por el número de documento
router.get("/getEmployeed/:documentNumber", getEmployeed);

//Ruta para crear un encargado de una empresa
router.post("/newManager", createCompanyAndAssociateUser);

// Ruta para obtener todos los usuarios
router.get("/getUsers", findUsers);

// Ruta para iniciar sesión
router.post("/signIn", signIn);

//Ruta para crear los empleados con excel
router.post("/newEmployees", uploadUsers);

module.exports = router;

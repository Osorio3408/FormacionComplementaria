const express = require("express");
const User = require("../models/user");
const { createUser, findUsers } = require("../controllers/userController");
const { signIn } = require("../controllers/authController");

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/newUser", createUser);

// Ruta para obtener todos los usuarios
router.get("/getUsers", findUsers);

// Ruta para iniciar sesión
router.post("/signIn", signIn);

module.exports = router;

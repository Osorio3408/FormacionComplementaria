const express = require("express");
const User = require("../models/user");
const { createUser, findUsers } = require("../controllers/userController");
const {
  createCompanyAndAssociateUser,
} = require("../controllers/managerController");
const {
  signIn,
  sendPasswordRecoveryEmail,
  resetPassword,
} = require("../controllers/authController");
const {
  uploadUsers,
  listEmployeesByCompany,
  getEmployeed,
  listEmployeesWithoutCompany,
  assignNITToEmployee,
  editEmployee,
  deleteEmployee,
  enrollUserInCourse,
  updateEmployeeData,
} = require("../controllers/employeesController");
const {
  getCoursesByInstructor,
  getEnrolledStudents,
  getInstructors,
} = require("../controllers/instructorController");

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

//Ruta para enviar el correo para recuperación de contraseña.
router.post("/passwordRecovery", sendPasswordRecoveryEmail);

//Ruta para hacer la recuperación de contraseña.
router.post("/resetPassword/:token", resetPassword);

//Ruta para crear los empleados con excel
router.post("/newEmployees", uploadUsers);

//Ruta para obtener los usuarios sin empresa para agregar a empresas
router.get("/getEmployeesWithoutCompany", listEmployeesWithoutCompany);

// Ruta para asignarle una empresa a un usuario
router.post("/assignNITToEmployee", assignNITToEmployee);

// Ruta para editar un empleado por número de documento
router.put("/editEmployee/:documentNumber", editEmployee);

// Ruta para eliminar un empleado por número de documento
router.delete("/deleteEmployee/:documentNumber", deleteEmployee);

//Ruta para obtener a los instructores o usuarios con rol 'Instructor'
router.get("/getInstructors", getInstructors);

// Ruta para inscribir un usuario en un curso
router.post("/enrollUserInCourse/:courseId", enrollUserInCourse);

//Ruta para actualizar los datos de un empleado
router.put("/updateEmployeeData/:userId", updateEmployeeData);

//Ruta para obtener los cursos asignados a un instructor
router.get("/getCoursesByInstructor/:documentNumber", getCoursesByInstructor);

// Ruta para obtener la lista de aprendices inscritos en un curso específico
router.get("/getEnrolledStudents/:courseId", getEnrolledStudents);

module.exports = router;

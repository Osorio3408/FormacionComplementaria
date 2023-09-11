const Course = require("../models/Course"); // Importa el modelo de Course
const Enterprise = require("../models/enterprise");
const History = require("../models/history");
const User = require("../models/user");

//Función para crear un historial
const createHistory = async (req, res) => {
  try {
    const { title, description, documentNumber } = req.body;
    const newHistory = new History({
      title,
      description,
      documentNumber,
    });

    const saveHistory = newHistory.save();

    res
      .status(200)
      .json({ message: "Se ha guardado el historial correctamente!" });
  } catch (error) {
    console.log("Error al crear el historial", TypeError);
    res.status(500).json({ error: "Error interno en el servidor.", error });
  }
};

//Función para listar el historial
const getHistory = async (req, res) => {
  try {
    // const empresas = await Course.distinct("enterprise.nameEnterprise");
    const history = await History.find();
    res.status(200).send(history);

    // res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};

// Agrega las funciones en la exportación para poder usarlas
module.exports = {
  createHistory,
  getHistory,
};

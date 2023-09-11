const Course = require("../models/Course"); // Importa el modelo de Course
const Enterprise = require("../models/enterprise");
const History = require("../models/history");
const User = require("../models/user");

//Función para crear un historial
const createHistory = async (req, res) => {
  try {
    const { title, description, documentNumber, nit } = req.body;

    console.log(nit);
    const newHistory = new History({
      title,
      description,
      documentNumber,
      nit,
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

const getHistory = async (req, res) => {
  try {
    // Obtener historial
    const history = await History.find();

    // Crear un objeto para mapear NIT a nombre de empresa
    const nitToNameMap = {};

    // Obtener nombres de empresas a partir de los NITs en el historial
    for (const historyItem of history) {
      const nit = historyItem.nit;

      // Si ya hemos obtenido el nombre de la empresa para este NIT, saltar
      if (nitToNameMap[nit]) continue;

      // Buscar la empresa por NIT y obtener el nombre
      const enterprise = await Enterprise.findOne({ nit });
      if (enterprise) {
        nitToNameMap[nit] = enterprise.nameEnterprise;
      }
    }

    // Combinar información de historial con nombres de empresas
    const historyWithCompanyNames = history.map((historyItem) => ({
      title: historyItem.title,
      description: historyItem.description,
      documentNumber: historyItem.documentNumber,
      createdAt: historyItem.createdAt,
      companyName: nitToNameMap[historyItem.nit], // Nombre de la empresa
    }));

    res.status(200).json(historyWithCompanyNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el historial" });
  }
};

// Agrega las funciones en la exportación para poder usarlas
module.exports = {
  createHistory,
  getHistory,
};

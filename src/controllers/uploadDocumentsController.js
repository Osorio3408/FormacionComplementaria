const fs = require("fs");
const path = require("path");

// Función para manejar la carga de documentos PDF de cédulas
const uploadDocuments = async (req, res) => {
  try {
    console.log(req.files);
    // Verifica si existen archivos en el cuerpo de la solicitud
    if (!req.body || !req.body.files) {
      return res.status(400).json({
        message: "No se encontraron archivos en el cuerpo de la solicitud.",
      });
    }

    // Obtiene los archivos cargados desde el cuerpo de la solicitud
    const { files } = req.body;

    // Directorio donde se guardarán los archivos cargados
    const uploadDir = path.join(__dirname, "/uploads");

    // Crea el directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Itera sobre los archivos y guárdalos en el servidor
    for (const file of files) {
      const fileName = file.name;
      const fileData = Buffer.from(file.data, "base64"); // Decodifica los datos Base64

      // Ruta completa del archivo en el servidor
      const filePath = path.join(uploadDir, fileName);

      // Guarda el archivo en el servidor
      fs.writeFileSync(filePath, fileData);
    }

    res.status(200).json({ message: "Archivos cargados con éxito." });
  } catch (error) {
    console.error("Error al cargar archivos:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Agrega la función a la exportación del controlador
module.exports = {
  uploadDocuments,
};

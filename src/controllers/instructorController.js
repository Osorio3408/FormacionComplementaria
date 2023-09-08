const Course = require("../models/Course");
const exceljs = require("exceljs");
const User = require("../models/user");
const fs = require("fs");

//Función para obtener los cursos que tiene asignado un instructor
const getCoursesByInstructor = async (req, res) => {
  try {
    // Obtén el número de documento del instructor desde la solicitud (puedes usar req.params o req.query según cómo esté diseñada tu ruta)
    const { documentNumber } = req.params;

    // Busca cursos en función del número de documento del instructor
    const courses = await Course.find({
      documentNumberTeacher: documentNumber,
    });

    if (!courses) {
      return res
        .status(404)
        .json({ message: "No se encontró cursos asignados al instructor " });
    }

    // Envía la lista de cursos como respuesta
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener los cursos del instructor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const fillExcelTemplate = async (templatePath, data) => {
  console.log(templatePath);
  // Crea una nueva instancia de Workbook (libro de trabajo).
  const workbook = new exceljs.Workbook();

  // Carga la plantilla desde el archivo.
  await workbook.xlsx.readFile(templatePath);

  // Selecciona la hoja de trabajo en la que deseas trabajar (por defecto, es la primera hoja).
  const worksheet = workbook.getWorksheet(1);

  // Define la fila inicial donde deseas comenzar a llenar los datos.
  let rowIndex = 10;

  // Itera a través de los datos y llena la plantilla.
  data.forEach((item) => {
    worksheet.getCell(`B${rowIndex}`).value = item.documentType;
    worksheet.getCell(`C${rowIndex}`).value = item.documentNumber;
    worksheet.getCell(`D${rowIndex}`).value = item.nameUser;
    worksheet.getCell(`I${rowIndex}`).value = item.emailUser;
    worksheet.getCell(`K${rowIndex}`).value = item.cellphoneNumberUser;

    // Incrementa el índice de fila para el siguiente conjunto de datos.
    rowIndex++;
  });

  // Convierte el archivo Excel a un flujo (stream).
  const stream = await workbook.xlsx.writeBuffer();

  return stream;
};

// Controlador para obtener la lista de aprendices inscritos en un curso específico
const getEnrolledStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Busca el curso por su ID.
    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Extrae la lista de inscritos del curso.
    const enrolledStudentIds = course.inscribed; // Array de números de documento

    // Busca a los estudiantes por número de documento.
    const enrolledStudents = await User.find({
      documentNumber: { $in: enrolledStudentIds },
    });

    // Define la ubicación de la plantilla Excel.
    const templatePath = "plantilla2.xlsx";

    // Llena la plantilla con los datos.
    const filledTemplate = await fillExcelTemplate(
      templatePath,
      enrolledStudents
    );

    // Establece las cabeceras de la respuesta para indicar que se enviará un archivo Excel.
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Lista_de_Aprendices.xlsx"
    );

    // Envía el archivo Excel como respuesta.
    res.status(200).send(filledTemplate);
  } catch (error) {
    console.error("Error al obtener la lista de aprendices:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Agrega las funciones en la exportación para poder usarlas
module.exports = {
  getCoursesByInstructor,
  getEnrolledStudents,
};

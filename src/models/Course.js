const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  // Datos de la empresa
  enterprise: {
    nit: { type: String, ref: "Enterprise" }, // Referencia a la Empresa
    nameEnterprise: { type: String, required: true },
    cityEnterprise: { type: String, required: true },
    manager: {
      nameManager: { type: String, required: true },
      cellphoneManager: { type: String, required: true },
      emailManager: { type: String, required: true },
    },
  },

  // Datos del curso/formación
  course: {
    courseNumber: { type: String },
    nameCourse: { type: String },
    radicado: { type: String },
    nis: { type: String },
    instructor: { type: String },
    responseDate: { type: Date },
    startDate: { type: Date },
    radicadoConfirmation: { type: String },
  },

  //Campo para el id del estado del curso
  idState: { type: Number, ref: "StatusCourses" },
  //Campo para el número de documento de quien creó el curso.
  documentNumber: { type: Number, ref: "User" },
  // Campo para la fecha de creación
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  // Datos de la empresa
  enterprise: {
    nit: { type: String, ref: "Enterprise", required: true }, // Referencia a la Empresa
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
    nameCourseAssigned: { type: String },
    radicado: { type: String },
    nis: { type: String },
    instructor: { type: String },
    responseDate: { type: Date },
    startDate: { type: Date },
    finishDate: { type: Date },
    radicadoConfirmation: { type: String },
    //Campo para ver el número de inscritos en el curso/formacion
    inscribeedNumber: { type: Number, max: 50 },
    //Campo de aprendices requeridos para empezar el curso/formacion
    minRequirement: { type: Number, required: true },
  },

  inscribed: [
    {
      type: Number,
      ref: "User",
      localField: "documentNumber",
      foreignField: "documentNumber",
    },
  ],

  //Campo para el número de documento del instructor que va dictar el curso/formación
  documentNumberTeacher: { type: Number },
  //Campo para el id del estado del curso/formacion
  idState: { type: Number, ref: "StatusCourses" },
  //Campo para el número de documento de quien creó el curso/formacion.
  documentNumber: { type: Number, ref: "User" },
  // Campo para la fecha de creación
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;

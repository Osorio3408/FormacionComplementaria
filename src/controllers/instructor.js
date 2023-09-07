const User = require("../models/user");

//Función para obtener los usuarios con rol instructor

const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ rol: "Instructor" }).select(
      "nameUser documentNumber"
    );

    if (!instructors) {
      return res.status(404).json({ message: "Instructor no encontrado" });
    }

    res.status(200).send(instructors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el instructor!" });
  }
};

module.exports = {
  getInstructors,
};

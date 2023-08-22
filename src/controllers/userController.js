const User = require("../models/user");

//Función para crear un usuario
const createUser = async (req, res) => {
  try {
    const { name, email, cellphoneNumber, password } = req.body;
    const user = new User({ name, email, cellphoneNumber, password });
    await user.save();
    res.status(201).send("Usuario creado exitosamente!");
  } catch (error) {
    res.status(400).send(error);
  }
};

const findUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  findUsers,
};

const Company = require("../models/company");

//Función para crear un usuario
const createCompany = async (req, res) => {
  try {
    const { name, address, email, cellphoneNumber, password } = req.body;
    const company = new Company({
      name,
      address,
      email,
      cellphoneNumber,
      password,
    });
    await company.save();
    res.status(201).send("Empresa creada exitosamente!");
  } catch (error) {
    res.status(400).send(error);
  }
};

const findCompanys = async (req, res) => {
  try {
    const companys = await Company.find();
    res.status(200).send(companys);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createCompany,
  findCompanys,
};

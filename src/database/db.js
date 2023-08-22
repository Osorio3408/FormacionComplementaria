const mongoose = require("mongoose");

const connectDB = () => {
  const dbConnectionString =
    "mongodb+srv://osorio:MhoObFt3nWLX8S3x@cluster0.5bqjh5x.mongodb.net/FormacionComplementaria";

  mongoose
    .connect(dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectado a MongoDB");
    })
    .catch((error) => {
      console.error("Error al intentar conectar a MongoDB:", error);
    });
};

module.exports = connectDB;

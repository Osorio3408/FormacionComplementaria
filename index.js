const express = require("express");
const connectDB = require("./src/database/db");
const userRoutes = require("./src/routes/userRoutes");
const companyRoutes = require("./src/routes/companyRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de las políticas de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Cambia esto al dominio correcto
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

connectDB();

app.use("/api", userRoutes); // Montar las rutas de usuarios bajo la ruta base "/api"
app.use("/api", companyRoutes); // Montar las rutas de usuarios bajo la ruta base "/api"

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(process.version);

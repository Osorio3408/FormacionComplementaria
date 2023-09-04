// Importamos el módulo express, que nos permite crear aplicaciones web y APIs
const express = require("express");

// Importamos la función connectDB para establecer la conexión con la base de datos
const connectDB = require("./src/database/db");

// Importamos las rutas relacionadas con los usuarios
const userRoutes = require("./src/routes/userRoutes");
const courseRoutes = require("./src/routes/courseRoutes");

// Creamos una instancia de la aplicación express
const app = express();

// Definimos el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Configuración de las políticas de CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  // Lista de orígenes permitidos para solicitudes CORS
  const allowedOrigins = [
    "http://localhost:5173", // Origen local para desarrollo
    "https://formacion-complementaria.netlify.app", // Origen en Netlify
  ];

  // Obtenemos el origen de la solicitud del encabezado
  const origin = req.headers.origin;

  // Si el origen está en la lista de permitidos, configuramos las cabeceras CORS
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Manejo especial para solicitudes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Respondemos OK a las solicitudes OPTIONS
  } else {
    next(); // Pasamos al siguiente middleware
  }
});

// Agregamos un middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Conectamos la base de datos al servidor
connectDB();

// Definimos el enrutamiento para las rutas relacionadas con usuarios bajo el prefijo "/api"
app.use("/api", userRoutes);
app.use("/api", courseRoutes);

// Iniciamos el servidor escuchando en el puerto definido
app.listen(PORT, () => {
  console.log(`El servidor está en ejecución en el puerto ${PORT}`);
});

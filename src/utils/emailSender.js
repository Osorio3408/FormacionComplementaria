// Importamos la librería nodemailer
const nodemailer = require("nodemailer");

// Creamos un objeto transporter utilizando el método createTransport
const transporter = nodemailer.createTransport({
  // Configuramos el servicio de correo electrónico a utilizar (en este caso, Gmail)
  service: "Gmail",

  // Proporcionamos las credenciales de autenticación para la cuenta de correo
  auth: {
    user: "senacursoscomplentarios2@gmail.com", // Tu dirección de correo electrónico
    pass: "hluqxmwjuoisirsl", // La contraseña de tu cuenta de correo o una "contraseña de aplicación"
  },
});

// Exportamos el objeto transporter para que esté disponible en otras partes de la aplicación
module.exports = transporter;

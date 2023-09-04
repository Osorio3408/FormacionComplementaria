# Aplicación de Registro y Administración de Usuarios

Esta es una aplicación web que permite el registro y administración de usuarios. Los usuarios pueden registrarse, iniciar sesión, crear cuentas de empleados desde archivos Excel, y solicitar cursos de formación complementaria. La aplicación está construida utilizando tecnologías como React, Node.js, Express y MongoDB.

## Características

- Registro de usuarios con validación de campos y encriptación de contraseñas.
- Inicio de sesión seguro con autenticación de JWT (JSON Web Tokens).
- Creación de cuentas de empleados desde archivos Excel.
- Solicitud de cursos de formación complementaria para empleados.
- Políticas de CORS configuradas para permitir solicitudes desde diferentes orígenes.
- Integración con la base de datos MongoDB para almacenar la información de los usuarios.
- Diseño responsivo para una experiencia de usuario óptima en diferentes dispositivos.

## Tecnologías Utilizadas

- Frontend: React, React Router, Tailwind CSS.
- Backend: Node.js, Express.
- Base de Datos: MongoDB.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto:
3. Instala las dependencias
4. Configura la conexión a la base de datos MongoDB en 'src/database/db.js'
5. Configura la conexion con emailSender cambiando el 'user' y 'pass' con las credenciales indicadas
6. inicia el servidor 'npm start'

## Autor

Yuliam Osorio - yuliamwow@gmail.com

## Enlaces

- [Enlace al Repositorio del Client](https://github.com/Osorio3408/FormacionComplementariaClient)
- [Enlace a la Aplicación en Vivo](https://serverformacion.up.railway.app/)

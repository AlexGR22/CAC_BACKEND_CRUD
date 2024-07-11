/** Acceso al servidor
 */

// Importamos express
const express = require("express");

// Instanciamos express
const app = express();

// Importamos el módulo bookRouter
const bookRoutes = require("../routes/booksRoutes.js");
const writerRoutes = require("../routes/writersRoutes.js");

// Declaramos el puerto
const PORT = 3000;

// Transformación del body a formato legible
app.use(express.json());

// Prefijo principal de las rutas
app.use("/books", bookRoutes);
app.use("/writers", writerRoutes);

// Inicialización del servidor
app.listen(PORT,()=>{console.log("Servidor escuchado en puerto 3000");});
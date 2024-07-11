/**
 * Enrutador
 * Endpoints
 */

// Importamos express
const express = require("express");

// Instanciamos router de express para get, post, put, delete
const router = express.Router();

// Importamos el controlador de funciones
const writerController = require("../controllers/writerController");

// *** SOLICITUDES ***
// GET: Obtener listado completo de libros
router.get("/listado", writerController.getAllWriters);

// GET: Obtener libro por id
router.get("/:id", writerController.getWriterById);

// POST: Crear libro
router.post("/add", writerController.createWriter);

// PUT: Crear libro
router.put("/:id", writerController.updateWriter);

// DELETE: Eliminar libro
router.delete("/delete/:id", writerController.deleteWriter);

// Exportamos el módulo
module.exports = router;
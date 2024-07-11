/**
 * Enrutador
 * Endpoints
 */

// Importamos express
const express = require("express");

// Instanciamos router de express para get, post, put, delete
const router = express.Router();

// Importamos el controlador de funciones
const bookController = require("../controllers/bookController");

// *** SOLICITUDES ***
// GET: Obtener listado completo de libros
router.get("/listado", bookController.getAllBooks);

// GET: Obtener libro por id
router.get("/:id", bookController.getBookById);

// POST: Crear libro
router.post("/add", bookController.createBook);

// PUT: Crear libro
router.put("/:id", bookController.updateBook);

// DELETE: Eliminar libro
router.delete("/:id", bookController.deleteBook);

// Exportamos el módulo
module.exports = router;
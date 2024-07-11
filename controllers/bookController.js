/*** METODOS ***
 * .getAllBooks
 * .getBookById
 * .createBook
 * .updateBook
 * .deleteBook
 */

// Importamos el módulo db
const db = require("../db/db.js");

// getAllBooks
const getAllBooks = (req, res)=>{
    // Consulta para traer todos los libros cargados de la base de datos
    const sql = 'SELECT * FROM books';

    // Enviamos la consulta a la bbdd
    db.query(sql, (error, results)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json(results);
    });
};

// getBookById
const getBookById = (req, res)=>{
    // Obtenemos id:
    const {id} = req.params;

    // Consulta a la bbdd por id
    const sql = 'SELECT * FROM books WHERE id = ?';
    
    // Enviamos la consulta a la bbdd
    db.query(sql,[id], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json(result);
    });
}

// createBook
const createBook = (req, res)=>{
    const {title, writer, editorial, year} = req.body;
    // Cargar libros a la base de datos
    const sql = 'INSERT INTO books (title, writer, editorial, year) VALUES (?,?,?,?)';

    // Enviamos la consulta a la bbdd
    db.query(sql,[title, writer, editorial, year], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json({mensaje: "Libro cargado"});
    });
}

// updateBook
const updateBook = (req, res)=>{
    const {id} = req.params;
    const {title, writer, editorial, year} = req.body;

    // Consulta con marcadores
    const sql = `UPDATE books SET title = ?, writer = ?, editorial = ?, year = ? WHERE id =  ${id}`;

    // Enviamos la consulta a la bbdd
    db.query(sql, [title, writer, editorial, year], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json({mensaje: "Libro actualizado"});
    });
}

// deleteBook
const deleteBook = (req, res)=>{
    // Desestructuración por id
    const {id} = req.params;

    // Consulta por sql
    const sql = 'DELETE FROM books WHERE id = ?';

    // Enviamos la consulta a la bbdd
    db.query(sql, [id], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json({mensaje: "Libro borrado"});
    }); 
}

// Exportamos el módulo con los métodos
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
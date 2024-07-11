
// Importamos el módulo db
const db = require("../db/db.js");

// getAllBooks
const getAllWriters = (req, res)=>{
    // Consulta para traer todos los libros cargados de la base de datos
    const sql = 'SELECT * FROM writers';

    // Enviamos la consulta a la bbdd
    db.query(sql, (error, results)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json(results);
    });
};


const getWriterById = (req, res)=>{
    // Obtenemos id:
    const {id} = req.params;

    // Consulta a la bbdd por id
    const sql = 'SELECT * FROM writers WHERE id = ?';
    
    // Enviamos la consulta a la bbdd
    db.query(sql,[id], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json(result);
    });
}

// createBook
const createWriter = (req, res)=>{
    const {name, surname, age, id} = req.body;
    // Cargar libros a la base de datos
    const sql = 'INSERT INTO writers (name,surname,age,id) VALUES (?,?,?,?)';

    // Enviamos la consulta a la bbdd
    db.query(sql,[name,surname,age,id], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json({mensaje: "Escritor cargado"});
    });
}

// updateBook
const updateWriter = (req, res)=>{
    const {id} = req.params;
    const {name, surname, age} = req.body;

    // Consulta con marcadores
    const sql = `UPDATE writers SET name = ?, surname = ?, age = ? WHERE id =  ${id}`;

    // Enviamos la consulta a la bbdd
    db.query(sql, [name, surname, age], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json({mensaje: "Escritor actualizado"});
    });
}

// deleteBook
const deleteWriter = (req, res)=>{
    // Desestructuración por id
    const {id} = req.params;

    // Consulta por sql
    const sql = 'DELETE FROM writers WHERE id = ?';

    // Enviamos la consulta a la bbdd
    db.query(sql, [id], (error, result)=>{
        // Error:
        if(error){throw error};
        // Exito:
        res.json({mensaje: "Escritor borrado"});
    }); 
}

// Exportamos el módulo con los métodos
module.exports = {
    getAllWriters,
    getWriterById,
    createWriter,
    updateWriter,
    deleteWriter
};
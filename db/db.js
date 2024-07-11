/********************************************************
 * CREACION DEL OBJETO PARA CONECTAR CON LA BASE DE DATOS
 ********************************************************
 */
require ("dotenv").config();



// Importamos el módulo mysql2
const mysql = require("mysql2");

// Configuración de la conexión
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.DB_PASSWORD,
    port: 3306,
    // database:"books_db"
});

connection.connect((err)=>{
    // Error:
    if(err) {
        console.log("Error de conexión con el servidor: "+err);
        return;
    }
    // Exito
    console.log("Estado de conexión: CONECTADA");

    // Consulta sql
    const sql = 'CREATE DATABASE IF NOT EXISTS books_db';

    // Verificamos y creamos la base de datos
    connection.query(sql, (err, results)=>{
        // Error:
        if(err) {
            console.log('Error al crear la base de datos: ', err);
            return;
        }
        // Exito:
        console.log("Base de datos: CREADA o EXISTENTE");

        // Dentro de base de datos books_db:
        connection.changeUser({database:"books_db"}, (err)=>{
            // Error:
            if(err) {
                console.log('Error al cambiar a la base de datos books_db: ', err);
                return;
            }

            // Exito:
            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            writer VARCHAR(255) NOT NULL,
            editorial VARCHAR(255) NOT NULL,
            year INT NOT NULL
            );
            `;

            // Pasamos la consulta a la bbdd
            connection.query(createTableQuery, (err, results)=>{
                // Error:
                if(err) {
                    console.log('Error al crear la tabla:', err);
                    return;
                }

                // Exito:
                console.log("Tabla: CREADA o EXISTENTE");
            });
        });
    });
});

// Exportamos el módulo
module.exports = connection;
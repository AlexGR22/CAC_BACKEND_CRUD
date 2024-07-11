/********************************************************
 * CREACION DEL OBJETO PARA CONECTAR CON LA BASE DE DATOS
 ********************************************************
 */
require("dotenv").config();

// Importamos el módulo mysql2
const mysql = require("mysql2");

// Configuración de la conexión
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    port: 3306,
});

connection.connect((err) => {
    // Error:
    if (err) {
        console.log("Error de conexión con el servidor: " + err);
        return;
    }
    // Exito
    console.log("Estado de conexión: CONECTADA");

    // Consulta sql
    const sql = 'CREATE DATABASE IF NOT EXISTS books_db';

    // Verificamos y creamos la base de datos
    connection.query(sql, (err, results) => {
        // Error:
        if (err) {
            console.log('Error al crear la base de datos: ', err);
            return;
        }
        // Exito:
        console.log("Base de datos de libros: EXISTENTE o CREADA CON EXITO");

        // Dentro de base de datos books_db:
        connection.changeUser({ database: "books_db" }, (err) => {
            // Error:
            if (err) {
                console.log('Error al cambiar a la base de datos books_db: ', err);
                return;
            }

            // Exito:
            const createTableBooks = `
            CREATE TABLE IF NOT EXISTS books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            writer VARCHAR(255) NOT NULL,
            writer_id INT,
            editorial VARCHAR(255) NOT NULL,
            year INT NOT NULL,
            FOREIGN KEY (writer_id) REFERENCES writers(id)
            );
            `;
            const createTableWriters = `
            CREATE TABLE IF NOT EXISTS writers (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            surname VARCHAR(255) NOT NULL,
            age INT NOT NULL
            );
            `;


            connection.query(createTableWriters, (err, results) => {
                // Error:
                if (err) {
                    console.log('Error al crear la tabla:', err);
                    return;
                }

                // Exito:
                console.log("Tabla de Escritores:EXISTENTE o CREADA CON EXITO");
            });

            // Pasamos la consulta a la bbdd
            connection.query(createTableBooks, (err, results) => {
                // Error:
                if (err) {
                    console.log('Error al crear la tabla:', err);
                    return;
                }

                // Exito:
                console.log("Tabla de Libros:EXISTENTE o CREADA CON EXITO");
            });

        });
    });
});

// Exportamos el módulo
module.exports = connection;
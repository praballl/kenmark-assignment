const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
// creating connection 

const con = mysql.createConnection({
    host: process.env.HOST,
    connectionLimit: 50,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

// exporting module
module.exports = con;
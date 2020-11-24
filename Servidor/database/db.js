const Pool = require('pg').Pool
//Creación de función de conexión con la base de datos en PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MiproData',
    password: '12345678',
    port: 5432,
})

module.exports = pool;
const Pool = require('pg').Pool
//Creación de función de conexión con la base de datos en PostgreSQL
const pool = new Pool({
    user: 'usuario_mapas',
    host: '192.168.2.122',
    database: 'ec_mipro_produccion',
    password: 'usrmapas2021',
    port: 5432,
})

module.exports = pool;
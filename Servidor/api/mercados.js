//Uso de la conexión a la base.
const pool = require ('../database/db');

//Funciones con Querys para consulas a la base.

//Función para Consultar todos los datos de la tabla de mercados.
const getMercados = (request, response) => {
    pool.query('SELECT * FROM ec_mipro_mapas.mercados ORDER BY id_mercado ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//Función para Consultar un dato según el ID de la tabla Mercados.
const getMercadoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM ec_mipro_mapas.mercados WHERE id_mercado = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//Función para Insertar un nuevo mercado en la base de datos.
const createMercado = (request, response) => {
    const { nombre, longitud, latitud } = request.body

    pool.query('INSERT INTO ec_mipro_mapas.mercados (nombre,longitud,latitud) VALUES ($1, $2, $3)', [nombre,longitud,latitud], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Mercado ingresado con ID: ${result.insertId}`)
    })
}
//Función para Actualizar un mercado en la base.
const updateMercado = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre,longitud,latitud } = request.body

    pool.query(
        'UPDATE ec_mipro_mapas.mercados SET nombre = $1, longitud = $2,latitud = $3 WHERE id_mercado = $4',
        [nombre, longitud,latitud, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Mercado modificado con ID: ${id}`)
        }
    )
}
//Función para Eliminar un mercado de la base.
const deleteMercado = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM ec_mipro_mapas.mercados WHERE id_mercado = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Mercado eliminado con ID: ${id}`)
    })
}
//Exportamos las funciones para su uso en otro archivo
module.exports = {
    getMercados,
    getMercadoById,
    createMercado,
    updateMercado,
    deleteMercado,
}
const pool = require ('../database/db');

const getMercados = (request, response) => {
    pool.query('SELECT * FROM mercados ORDER BY id_mercado ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getMercadoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM mercados WHERE id_mercado = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createMercado = (request, response) => {
    const { nombre, longitud, latitud } = request.body

    pool.query('INSERT INTO mercados (nombre,longitud,latitud) VALUES ($1, $2, $3)', [nombre,longitud,latitud], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Mercado ingresado con ID: ${result.insertId}`)
    })
}
const updateMercado = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre,longitud,latitud } = request.body

    pool.query(
        'UPDATE users SET nombre = $1, longitud = $2,latitud = $3 WHERE id_mercado = $4',
        [nombre, longitud,latitud, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Mercado modificado con ID: ${id}`)
        }
    )
}
const deleteMercado = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM mercados WHERE id_mercado = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Mercado eliminado con ID: ${id}`)
    })
}
module.exports = {
    getMercados,
    getMercadoById,
    createMercado,
    updateMercado,
    deleteMercado,
}
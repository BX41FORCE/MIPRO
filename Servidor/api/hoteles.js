const pool = require ('../database/db');

const getHoteles = (request, response) => {
    pool.query('SELECT * FROM hoteles ORDER BY id_hotel ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getHotelById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM hoteles WHERE id_hotel = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createHotel = (request, response) => {
    const { nombre,the_geom,provincia,canton,parroquia,registro,fecha_apertura,actividad,clasificacion,categoria,tipo_organizacion,referencia,direccion,telefono,celular,email,web,estado,origen,hombres,mujeres,discapacitados,total_empleados,habitaciones,camas,dato,plazas_camas,mesas,plazas_mesas,vehiculo,admin_zonal,sector_turistico,zona_turistica,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas,pescado_y_otros_productos_acuaticos_elaborados,carne_productos_de_carne_subproductos,tuberculos_vegetales_melones_y_frutas,productos_de_panaderia,bebidas_alcoholicas,flores_y_capullos,fideos_macarrones_y_otros_productos_farinaceos_similares,productos_lacteos_elaborados,cacao_elaborado_chocolate_y_productos_de_confiteria,productos_de_cafe_elaborado } = request.body

    pool.query('INSERT INTO hoteles (nombre,the_geom,provincia,canton,parroquia,registro,fecha_apertura,actividad,clasificacion,categoria,tipo_organizacion,referencia,direccion,telefono,celular,email,web,estado,origen,hombres,mujeres,discapacitados,total_empleados,habitaciones,camas,dato,plazas_camas,mesas,plazas_mesas,vehiculo,admin_zonal,sector_turistico,zona_turistica,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas,pescado_y_otros_productos_acuaticos_elaborados,carne_productos_de_carne_subproductos,tuberculos_vegetales_melones_y_frutas,productos_de_panaderia,bebidas_alcoholicas,flores_y_capullos,fideos_macarrones_y_otros_productos_farinaceos_similares,productos_lacteos_elaborados,cacao_elaborado_chocolate_y_productos_de_confiteria,productos_de_cafe_elaborado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44,)', [nombre,the_geom,provincia,canton,parroquia,registro,fecha_apertura,actividad,clasificacion,categoria,tipo_organizacion,referencia,direccion,telefono,celular,email,web,estado,origen,hombres,mujeres,discapacitados,total_empleados,habitaciones,camas,dato,plazas_camas,mesas,plazas_mesas,vehiculo,admin_zonal,sector_turistico,zona_turistica,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas,pescado_y_otros_productos_acuaticos_elaborados,carne_productos_de_carne_subproductos,tuberculos_vegetales_melones_y_frutas,productos_de_panaderia,bebidas_alcoholicas,flores_y_capullos,fideos_macarrones_y_otros_productos_farinaceos_similares,productos_lacteos_elaborados,cacao_elaborado_chocolate_y_productos_de_confiteria,productos_de_cafe_elaborado], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Hotel ingresado con ID: ${result.insertId}`)
    })
}
const updateHotel = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre,the_geom,provincia,canton,parroquia,registro,fecha_apertura,actividad,clasificacion,categoria,tipo_organizacion,referencia,direccion,telefono,celular,email,web,estado,origen,hombres,mujeres,discapacitados,total_empleados,habitaciones,camas,dato,plazas_camas,mesas,plazas_mesas,vehiculo,admin_zonal,sector_turistico,zona_turistica,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas,pescado_y_otros_productos_acuaticos_elaborados,carne_productos_de_carne_subproductos,tuberculos_vegetales_melones_y_frutas,productos_de_panaderia,bebidas_alcoholicas,flores_y_capullos,fideos_macarrones_y_otros_productos_farinaceos_similares,productos_lacteos_elaborados,cacao_elaborado_chocolate_y_productos_de_confiteria,productos_de_cafe_elaborado } = request.body

    pool.query(
        'UPDATE hotel SET nombre = $1,the_geom,provincia = $2,canton = $3,parroquia = $5,registro = $6,fecha_apertura  = $7,actividad = $8,clasificacion = $9,categoria = $10,tipo_organizacion = $11,referencia = $12,direccion = $13,telefono = $14,celular = $15,email = $16,web = $17,estado = $18,origen = $19,hombres = $20,mujeres = $21,discapacitados = $22,total_empleados = $23,habitaciones = $24,camas = $25,dato = $26,plazas_camas = $27,mesas = $28,plazas_mesas = $29,vehiculo = $30,admin_zonal = $31,sector_turistico = $32,zona_turistica = $33,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas = $34,pescado_y_otros_productos_acuaticos_elaborados = $35,carne_productos_de_carne_subproductos = $36,tuberculos_vegetales_melones_y_frutas = $37,productos_de_panaderia = $38,bebidas_alcoholicas = $39,flores_y_capullos = $40,fideos_macarrones_y_otros_productos_farinaceos_similares = $41,productos_lacteos_elaborados = $42,cacao_elaborado_chocolate_y_productos_de_confiteria = $43,productos_de_cafe_elaborado = $44 WHERE id_hotel = $45',
        [nombre,the_geom,provincia,canton,parroquia,registro,fecha_apertura,actividad,clasificacion,categoria,tipo_organizacion,referencia,direccion,telefono,celular,email,web,estado,origen,hombres,mujeres,discapacitados,total_empleados,habitaciones,camas,dato,plazas_camas,mesas,plazas_mesas,vehiculo,admin_zonal,sector_turistico,zona_turistica,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas,pescado_y_otros_productos_acuaticos_elaborados,carne_productos_de_carne_subproductos,tuberculos_vegetales_melones_y_frutas,productos_de_panaderia,bebidas_alcoholicas,flores_y_capullos,fideos_macarrones_y_otros_productos_farinaceos_similares,productos_lacteos_elaborados,cacao_elaborado_chocolate_y_productos_de_confiteria,productos_de_cafe_elaborado, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Hotel modificado con ID: ${id}`)
        }
    )
}
const deleteHotel = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM hoteles WHERE id_hotel = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Hotel eliminado con ID: ${id}`)
    })
}
module.exports = {
    getHoteles,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel,
}
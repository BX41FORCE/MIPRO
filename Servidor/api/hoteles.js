//Uso de la conexión a la base.
const pool = require('../database/db');

//Funciones con Querys para consulas a la base.

//Función para Consultar todos los datos de la tabla de hoteles.
const getHoteles = (request, response) => {
    pool.query('SELECT * FROM ec_mipro_mapas.hoteles ORDER BY id_hotel ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//Función para Consultar un dato según el ID de la tabla Hoteles.
const getHotelById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM ec_mipro_mapas.hoteles WHERE id_hotel = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//Función para Insertar un nuevo hotel en la base de datos.
const createHotel = (request, response) => {
    const { nombre, longitud,latitud, provincia, canton, parroquia, registro, fecha_apertura, actividad, clasificacion, categoria, tipo_organizacion, referencia, direccion, telefono, celular, email, web, estado, origen, hombres, mujeres, discapacitados, total_empleados, habitaciones, camas, dato, plazas_camas, mesas, plazas_mesas, vehiculo, admin_zonal, sector_turistico, zona_turistica, preparados_conservas_de_pescado_y_de_otras_especies_acuaticas, pescado_y_otros_productos_acuaticos_elaborados, carne_productos_de_carne_subproductos, tuberculos_vegetales_melones_y_frutas, productos_de_panaderia, bebidas_alcoholicas, flores_y_capullos, fideos_macarrones_y_otros_productos_farinaceos_similares, productos_lacteos_elaborados, cacao_elaborado_chocolate_y_productos_de_confiteria, productos_de_cafe_elaborado } = request.body

    pool.query('INSERT INTO ec_mipro_mapas.hoteles (nombre,longitud,latitud,provincia,canton,parroquia,registro,fecha_apertura,actividad,clasificacion,categoria,tipo_organizacion,referencia,direccion,telefono,celular,email,web,estado,origen,hombres,mujeres,discapacitados,total_empleados,habitaciones,camas,dato,plazas_camas,mesas,plazas_mesas,vehiculo,admin_zonal,sector_turistico,zona_turistica,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas,pescado_y_otros_productos_acuaticos_elaborados,carne_productos_de_carne_subproductos,tuberculos_vegetales_melones_y_frutas,productos_de_panaderia,bebidas_alcoholicas,flores_y_capullos,fideos_macarrones_y_otros_productos_farinaceos_similares,productos_lacteos_elaborados,cacao_elaborado_chocolate_y_productos_de_confiteria,productos_de_cafe_elaborado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45)', [nombre, latitud,longitud, provincia, canton, parroquia, registro, fecha_apertura, actividad, clasificacion, categoria, tipo_organizacion, referencia, direccion, telefono, celular, email, web, estado, origen, hombres, mujeres, discapacitados, total_empleados, habitaciones, camas, dato, plazas_camas, mesas, plazas_mesas, vehiculo, admin_zonal, sector_turistico, zona_turistica, preparados_conservas_de_pescado_y_de_otras_especies_acuaticas, pescado_y_otros_productos_acuaticos_elaborados, carne_productos_de_carne_subproductos, tuberculos_vegetales_melones_y_frutas, productos_de_panaderia, bebidas_alcoholicas, flores_y_capullos, fideos_macarrones_y_otros_productos_farinaceos_similares, productos_lacteos_elaborados, cacao_elaborado_chocolate_y_productos_de_confiteria, productos_de_cafe_elaborado], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Hotel ingresado con ID: ${result.insertId}`)
    })
}
//Función para Actualizar un hotel en la base.
const updateHotel = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre, longitud,latitud, provincia, canton, parroquia, registro, fecha_apertura, actividad, clasificacion, categoria, tipo_organizacion, referencia, direccion, telefono, celular, email, web, estado, origen, hombres, mujeres, discapacitados, total_empleados, habitaciones, camas, dato, plazas_camas, mesas, plazas_mesas, vehiculo, admin_zonal, sector_turistico, zona_turistica, preparados_conservas_de_pescado_y_de_otras_especies_acuaticas, pescado_y_otros_productos_acuaticos_elaborados, carne_productos_de_carne_subproductos, tuberculos_vegetales_melones_y_frutas, productos_de_panaderia, bebidas_alcoholicas, flores_y_capullos, fideos_macarrones_y_otros_productos_farinaceos_similares, productos_lacteos_elaborados, cacao_elaborado_chocolate_y_productos_de_confiteria, productos_de_cafe_elaborado } = request.body

    pool.query(
        'UPDATE hotel SET nombre = $1,longitud = $2,latitud=$3,provincia = $4,canton = $5,parroquia = $6,registro = $7,fecha_apertura  = $8,actividad = $9,clasificacion = $10,categoria = $11,tipo_organizacion = $12,referencia = $13,direccion = $14,telefono = $15,celular = $16,email = $17,web = $18,estado = $19,origen = $20,hombres = $21,mujeres = $22,discapacitados = $23,total_empleados = $24,habitaciones = $25,camas = $26,dato = $27,plazas_camas = $28,mesas = $29,plazas_mesas = $30,vehiculo = $31,admin_zonal = $32,sector_turistico = $33,zona_turistica = $34,preparados_conservas_de_pescado_y_de_otras_especies_acuaticas = $35,pescado_y_otros_productos_acuaticos_elaborados = $36,carne_productos_de_carne_subproductos = $37,tuberculos_vegetales_melones_y_frutas = $38,productos_de_panaderia = $39,bebidas_alcoholicas = $40,flores_y_capullos = $41,fideos_macarrones_y_otros_productos_farinaceos_similares = $42,productos_lacteos_elaborados = $43,cacao_elaborado_chocolate_y_productos_de_confiteria = $44,productos_de_cafe_elaborado = $45 WHERE id_hotel = $45',
        [nombre, longitud,latitud, provincia, canton, parroquia, registro, fecha_apertura, actividad, clasificacion, categoria, tipo_organizacion, referencia, direccion, telefono, celular, email, web, estado, origen, hombres, mujeres, discapacitados, total_empleados, habitaciones, camas, dato, plazas_camas, mesas, plazas_mesas, vehiculo, admin_zonal, sector_turistico, zona_turistica, preparados_conservas_de_pescado_y_de_otras_especies_acuaticas, pescado_y_otros_productos_acuaticos_elaborados, carne_productos_de_carne_subproductos, tuberculos_vegetales_melones_y_frutas, productos_de_panaderia, bebidas_alcoholicas, flores_y_capullos, fideos_macarrones_y_otros_productos_farinaceos_similares, productos_lacteos_elaborados, cacao_elaborado_chocolate_y_productos_de_confiteria, productos_de_cafe_elaborado, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Hotel modificado con ID: ${id}`)
        }
    )
}
//Función para Eliminar un hotel de la base.
const deleteHotel = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM ec_mipro_mapas.hoteles WHERE id_hotel = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Hotel eliminado con ID: ${id}`)
    })
}
//Exportamos las funciones para su uso en otro archivo
module.exports = {
    getHoteles,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel,
}
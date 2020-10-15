const express = require('express')
const app = express()
//Importación de consultas.
const mercados = require('../api/mercados')
const hoteles = require('../api/hoteles')

//Rutas para la Información de Mercados
app.get('/mercados/get', mercados.getMercados)
app.get('/mercados/get/:id', mercados.getMercadoById)
app.post('/mercados/post', mercados.createMercado)
app.put('/mercados/put/:id', mercados.updateMercado)
app.delete('/mercados/del/:id', mercados.deleteMercado)
//Rutas para la Información de Hoteles
app.get('/hoteles/get', hoteles.getHoteles)
app.get('/hoteles/get/:id', hoteles.getHotelById)
app.post('/hoteles/post', hoteles.createHotel)
app.put('/hoteles/put/:id', hoteles.updateHotel)
app.delete('/hoteles/del/:id', hoteles.deleteHotel)

module.exports = app;
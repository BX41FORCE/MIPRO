const express = require('express')
const app = express()
const db = require('../api/queries')


app.get('/mercados/get', db.getMercados)
app.get('/mercados/get/:id', db.getMercadoById)
app.post('/mercados/post', db.createMercado)
app.put('/mercados/put/:id', db.updateMercado)
app.delete('/mercados/del/:id', db.deleteMercado)

module.exports = app;
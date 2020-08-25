const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const apiRoute = require('./routes/routes')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/api', apiRoute);

app.get('/', (request, response) => {
    response.json({ info: 'Servidor API rest con Node.js, Express y Postgres' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
    console.log('Open Browser: http://localhost:3000/');
})

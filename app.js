const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const databaseConnection = require('./databaseConnection')
const quilometragemRoute = require('./routes/quilometragemRoute')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', quilometragemRoute)

app.listen(port, () => console.log('Running ...'))

module.exports  = { app, port }

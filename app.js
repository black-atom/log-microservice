import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import databaseConnection from './databaseConnection'
import quilometragemRoute from './api/routes/quilometragemRoute'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', quilometragemRoute)
app.listen(port, () => console.log('Running ...'))

export { app, port }

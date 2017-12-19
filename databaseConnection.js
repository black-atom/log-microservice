import mongoose from 'mongoose'
import bluebird from 'bluebird'

const dbConfig = require('./config/dbConfig')()

let db = null

let options = {
    db: { native_parser: true },
    server: { poolSize:10 },
    promiseLibrary: bluebird,
    user: dbConfig.username,
    pass: dbConfig.password
}

mongoose.connect(dbConfig.url, options);
mongoose.Promise = bluebird

db = mongoose.connection

global.db = db

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Database is successfully running '))

export default db
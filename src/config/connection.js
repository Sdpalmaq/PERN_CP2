const pgPromise = require('pg-promise')

//Conexion Local
const config = {
    host: 'localhost',
    port: '5432',
    database: 'cPagar',
    user: 'postgres',
    password: '0402003602'
}


const pgp = pgPromise({})
const db = pgp(config)
exports.db = db
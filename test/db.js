const pgp = require('pg-promise')()

const coreDB = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'testUser',
    ssl: false
  };
  
const db = pgp(coreDB)

module.exports = db
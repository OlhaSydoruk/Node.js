const {Client: Index} = require('pg');

require('dotenv').config();

const user = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DOCKER_POSTGRES_PORT;

const db = new Index({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

module.exports = {
    db: db
};
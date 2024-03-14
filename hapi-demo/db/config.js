const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.USER_NAME,
    host: process.env.USER_HOST,
    database: process.env.USER_DATABASE,
    password: process.env.USER_PASSWORD,
    port: process.env.USER_PORT,
});

module.exports = client;
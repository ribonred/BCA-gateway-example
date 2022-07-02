const mysql = require('mysql');

import knexConfig from '../../knexfile'; // eslint-disable-line
const environment = process.env.NODE_ENV || 'localhost';
export const config = knexConfig[environment];

const db = mysql.createConnection({
	host: config.connection.host,
	user: config.connection.user,
	password: config.connection.password,
	database: config.connection.database,
	port: config.connection.port,
});
module.exports = db;

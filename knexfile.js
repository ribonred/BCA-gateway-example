const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'data');

module.exports = {
	localhost: {
		client: 'mysql',
		connection: {
			multipleStatements: true,
			host: 'localhost',
			database: 'local-db',
			user: 'local-user',
			password: 'local-password',
			port: 3306,
			timezone: 'Asia/Jakarta',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
	development: {
		client: 'mysql',
		connection: {
			multipleStatements: true,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			timezone: 'Asia/Jakarta',
			port: process.env.DATABASE_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},

	staging: {
		client: 'mysql',
		connection: {
			multipleStatements: true,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			timezone: 'Asia/Jakarta',
			port: process.env.DATABASE_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},

	production: {
		client: 'mysql',
		connection: {
			multipleStatements: true,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			timezone: 'Asia/Jakarta',
			port: process.env.DATABASE_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},

};

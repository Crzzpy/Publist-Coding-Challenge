const { Client } = require('pg');

const client = new Client({
	user: '',
	host: '',
	database: '',
	password: '',
	port: 1234,
});

client.connect();

module.exports = client;
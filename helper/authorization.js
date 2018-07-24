const client = require('../database/client');
const bcrypt = require('bcrypt');

function authorize(username, password, next) {

	findUser(username, (hash) => {
		comparePassword(password, hash, (result) => {
			next(result);
		});
	});

}

function findUser(username,next) {

	client.query('SELECT * FROM "user" WHERE username = $1', [username], (err, res) => {
		(res['rows'][0] !== undefined) ? next(res['rows'][0]['password']) : next('');
	});

}

function comparePassword(password, hash, next) {

	bcrypt.compare(password, hash, function(err, res) {
		next(res);
	});

}

module.exports = {
	authorize: authorize
};
const client = require('./client'),
	bcrypt = require('bcrypt'),
	request = require('request');

let newsFinished = false,
	userFinished = false;

function startSetup() {

	client.query('SELECT 1 FROM "user" LIMIT 1', (err) => {
		if(err) {
			setupUserTable();
		} else {
			client.query('DROP TABLE "user"', (err) => {
				if (err) handleFailure(err);
				setupUserTable();
			});
		}
	});

	client.query('SELECT 1 FROM "news" LIMIT 1', (err) => {
		if(err) {
			setupNewsTable();
		} else {
			client.query('DROP TABLE "news"', (err) => {
				if(err) handleFailure(err);
				setupNewsTable();
			});
		}
	});

}

function setupUserTable() {

	client.query('CREATE TABLE "user" (username varchar(25), password varchar(255))', (err) => {
		if(err) handleFailure(err);
		initUserTable();
	});

}

function initUserTable() {

	const username = 'coding';
	const password = 'challenge';
	const iterationRounds = 10000;

	hashPassword(password, iterationRounds, (hash) => {
		client.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, hash], (err) => {
			if(err) handleFailure(err);
			userFinished = true;
			finish();
		});
	});

}

function hashPassword(password, iterationRounds, next) {

	bcrypt.hash(password, iterationRounds, (err, hash) => {
		next(hash);
	});

}

function setupNewsTable() {

	client.query('CREATE TABLE "news" (id varchar(25), title text, description text )', (err) => {
		if(err) handleFailure(err);
		initNewsTable();
	});

}

function initNewsTable() {

	request.post(
		'https://publist.ai/api/v2/jobs.backend',
		{ json: { query: 'tech' } },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				body.data.forEach(function (val, ind) {
					client.query('INSERT INTO "news" (id, title, description) VALUES ($1, $2, $3)', [val.id, val.title, val.description], (err) => {
						if(err) handleFailure(err);
						if (ind == body.data.length - 1) {
							newsFinished = true;
							finish();
						}
					});
				});
			}
		}
	);

}

function handleFailure(err) {
	console.log(err);
	console.log('An error occured while initialising please see the error message above.');
	process.exit(1);
}

function finish() {
	if(newsFinished && userFinished) {
		console.log('Database successfully initiated.');
		process.exit(0);
	}
}

startSetup();
const client = require('../database/client');

function getNewsHeadlines(next) {

	client.query('SELECT * FROM "news"', (err, res) => {
		handleHeadlines(res['rows'], (newHeadlines) => {
			next(newHeadlines);
		});
	});

}

function handleHeadlines(headlines, next) {

	let newHeadlines = [];

	headlines.forEach((val, ind) => {
		newHeadlines.push(val['title']);
		if (ind == headlines.length - 1) next(newHeadlines);
	});

}

module.exports = {
	getNewsHeadlines: getNewsHeadlines
};
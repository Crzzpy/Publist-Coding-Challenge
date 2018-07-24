const authorization = require('./helper/authorization');
const newslist = require('./helper/newslist');
const {json} = require('micro');

module.exports = async (req, res) => {

	if(req.method == 'GET') res.end('Please send the request as a POST request.');

	const requestBody = await json(req);

	if (requestBody.authorization) {
		const username = requestBody.authorization.username;
		const password = requestBody.authorization.password;

		if (username && password) {

			authorization.authorize(username, password, (authorizationStatus) => {
				if(authorizationStatus) {
					newslist.getNewsHeadlines((newsHeadlines) => {
						res.end(JSON.stringify(newsHeadlines));
					});
				} else {
					res.end('Error while authorizing. Make sure to send correct login data.');
				}
			});

		} else {

			res.end('Error while authorizing. Make sure to send correct login data.');

		}

	} else {
		res.end('You have to authorize before you can fetch data.');
	}

};

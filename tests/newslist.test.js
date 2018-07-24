const newslist = require('../helper/newslist');

test('Should return a list of all news titles', () => {

	newslist.getNewsHeadlines((headlines) => {
		expect(headlines).not.toBe([]);
		process.exit(0); //To force close database connection on exit
	});

});
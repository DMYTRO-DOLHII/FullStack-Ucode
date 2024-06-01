const fs = require('fs');
const path = require('path');

function calculateTime() {
	const startDate = new Date('1939-01-01');
	const currentDate = new Date();

	const diffTime = Math.abs(currentDate - startDate);
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffYears = Math.floor(diffDays / 365);
	const diffMonths = Math.floor((diffDays % 365) / 30);
	const remainingDays = (diffDays % 365) % 30;

	return {
		years: diffYears,
		months: diffMonths,
		days: remainingDays
	};
}

function normalRouter(req, res) {
	const time = calculateTime();
	const templatePath = path.join(__dirname, 'views', 'normal.ejs');
	fs.readFile(templatePath, 'utf8', (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			console.log(err);
			res.end('Internal Server Error');
		} else {
			const rendered = data.replace('<%= years %>', time.years)
				.replace('<%= months %>', time.months)
				.replace('<%= days %>', time.days);
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(rendered);
		}
	});
}

module.exports = normalRouter;

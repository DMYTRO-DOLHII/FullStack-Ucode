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

	const quantumYears = Math.floor(diffYears / 7);
	const remainingNormalYears = diffYears % 7;

	const quantumMonths = (remainingNormalYears * 12) + diffMonths;
	const quantumDays = remainingDays;

	return [
		quantumYears,
		quantumMonths,
		quantumDays
	];
}

function quantumRouter(req, res) {
	const quantumTime = calculateTime();
	const templatePath = path.join(__dirname, 'views', 'quantum.ejs');
	fs.readFile(templatePath, 'utf8', (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Internal Server Error');
		} else {
			const rendered = data.replace('<%= quantumTime[0] %>', quantumTime[0]).replace('<%= quantumTime[1] %>', quantumTime[1]).replace('<%= quantumTime[2] %>', quantumTime[2]);
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(rendered);
		}
	});
}

module.exports = quantumRouter;

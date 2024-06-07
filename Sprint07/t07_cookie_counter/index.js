const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

// Middleware to count page loads
app.use((req, res, next) => {
	let pageLoads = req.cookies.pageLoads || [];
	const currentTime = Date.now();

	// Filter out page loads older than 1 minute
	pageLoads = pageLoads.filter(time => currentTime - time <= 60000);

	// Add current page load time
	pageLoads.push(currentTime);

	// Set the updated page loads in the cookie
	res.cookie('pageLoads', pageLoads, { maxAge: 60000 });

	// Store the count in res.locals for use in the route handler
	res.locals.pageLoadCount = pageLoads.length;

	next();
});

app.get('/', (req, res) => {
	fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send('Internal Server Error');
			return;
		}

		const updatedData = data.replace('{{pageLoadCount}}', res.locals.pageLoadCount);
		res.send(updatedData);
	});
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

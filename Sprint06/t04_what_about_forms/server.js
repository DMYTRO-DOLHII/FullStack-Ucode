const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);

	if (req.method === 'GET' && req.url === '/') {
		fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
				return;
			}
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		});
	} else if (req.method === 'GET' && req.url === '/script.js') {
		fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
				return;
			}
			res.writeHead(200, { 'Content-Type': 'application/javascript' });
			res.end(data);
		});
	} else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const answer = new URLSearchParams(body).get('avenger');
			res.writeHead(200, { 'Content-Type': 'application/json' });
			const result = answer === 'Thor' ? 'Correct!' : 'Incorrect, try again.';
			res.end(JSON.stringify({ result }));
		});
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

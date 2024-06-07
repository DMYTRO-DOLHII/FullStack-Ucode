const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const iconv = require('iconv-lite');

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url);
	const pathname = parsedUrl.pathname;

	if (req.method === 'GET' && pathname === '/') {
		// Serve the HTML file
		const filePath = path.join(__dirname, 'index.html');
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
				return;
			}
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		});
	} else if (req.method === 'POST' && pathname === '/convert') {
		// Handle the form submission
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const postData = querystring.parse(body);
			const inputString = postData.inputString;
			const charset = postData.charset;
			let convertedString = '';

			if (charset === 'utf8') {
				convertedString = iconv.encode(inputString, 'utf8').toString('utf8');
			} else if (charset === 'latin1') {
				convertedString = iconv.encode(inputString, 'latin1').toString('latin1');
			} else if (charset === 'ascii') {
				convertedString = iconv.encode(inputString, 'ascii').toString('ascii');
			}

			// Serve the HTML with the converted string
			const filePath = path.join(__dirname, 'index.html');
			fs.readFile(filePath, 'utf8', (err, data) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end('Internal Server Error');
					return;
				}

				const responseData = data.replace('<p id="converted-string"></p>', `<p id="converted-string">${convertedString}</p>`);
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(responseData);
			});
		});
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

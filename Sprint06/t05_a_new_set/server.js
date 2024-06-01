const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

const server = http.createServer((req, res) => {
	if (req.method.toLowerCase() === 'get') {
		if (req.url === '/') {
			fs.readFile('index.html', (err, data) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end('Internal Server Error');
				} else {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(data);
				}
			});
		} else if (req.url === '/script.js') {
			fs.readFile('script.js', (err, data) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end('Internal Server Error');
				} else {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.end(data);
				}
			});
		} else if (req.url === '/style.css') {
			fs.readFile('style.css', (err, data) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end('Internal Server Error');
				} else {
					res.writeHead(200, { 'Content-Type': 'text/css' });
					res.end(data);
				}
			});
		}
	} else if (req.method.toLowerCase() === 'post' && req.url === '/submit') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});

		req.on('end', () => {
			const boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
			const parts = body.split('--' + boundary).filter(part => part.length > 0 && part !== '--\r\n');
			const parsedData = {};

			parts.forEach(part => {
				const [header, content] = part.split('\r\n\r\n');
				const nameMatch = header.match(/name="([^"]+)"/);
				if (nameMatch) {
					const name = nameMatch[1];
					if (header.includes('filename="')) {
						const filenameMatch = header.match(/filename="([^"]+)"/);
						if (filenameMatch) {
							const filename = filenameMatch[1];
							const filePath = path.join(uploadsDir, filename);
							const fileContent = content.split('\r\n')[0];
							fs.writeFileSync(filePath, fileContent, 'binary');
							parsedData[name] = filename;
						}
					} else {
						parsedData[name] = content.trim();
					}
				}
			});

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(parsedData));
		});
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

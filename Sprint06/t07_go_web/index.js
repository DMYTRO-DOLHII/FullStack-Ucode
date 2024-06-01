const http = require('http');
const normalRouter = require('./normal-router');
const quantumRouter = require('./quantum-router');
const PORT = 3000;

const server = http.createServer((req, res) => {
	if (req.url === '/normal') {
		normalRouter(req, res);
	} else if (req.url === '/quantum') {
		quantumRouter(req, res);
	} else {
		res.writeHead(302, { 'Location': '/normal' });
		res.end();
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

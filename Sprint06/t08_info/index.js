const http = require('http');
const os = require('os');
const url = require('url');

const server = http.createServer((req, res) => {
	const scriptName = process.argv[1];
	const scriptArguments = process.argv.slice(2).join(' ');

	// Get server IP address
	const interfaces = os.networkInterfaces();
	let serverIpAddress = '';
	Object.keys(interfaces).forEach((iface) => {
		interfaces[iface].forEach((ifaceInfo) => {
			if (ifaceInfo.family === 'IPv4' && !ifaceInfo.internal) {
				serverIpAddress = ifaceInfo.address;
			}
		});
	});

	const hostName = os.hostname();
	const protocolName = req.protocol;
	const queryMethod = req.method;
	const userAgent = req.headers['user-agent'];
	const clientIpAddress = req.connection.remoteAddress;
	const urlParameters = url.parse(req.url, true).query;

	console.log('Name of executed script:', scriptName);
	console.log('Arguments passed to the script:', scriptArguments);
	console.log('IP address of the server:', serverIpAddress);
	console.log('Name of host invoking the current script:', hostName);
	console.log('Name and version of the information protocol:', protocolName);
	console.log('Query method:', queryMethod);
	console.log('User-Agent information:', userAgent);
	console.log('IP address of the client:', clientIpAddress);
	console.log('List of parameters passed by URL:', urlParameters);

	res.end('Check the console for information.');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

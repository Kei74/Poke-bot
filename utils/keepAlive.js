const http = require('http');

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-type', 'text/html');
	res.write('Bot running!');
	res.end();
});

const PORT = process.env.PORT || 5000;

module.exports = { server, PORT };
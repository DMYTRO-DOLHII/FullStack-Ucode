const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let csvData = [];

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
	res.sendFile(path.join(__dirname, 'script.js'));
});

app.post('/upload', (req, res) => {
	const file = req.body.file;
	const filePath = path.join(__dirname, 'uploaded.csv');

	const base64Data = file.replace(/^data:text\/csv;base64,/, '');
	fs.writeFileSync(filePath, base64Data, 'base64');

	csvData = [];
	fs.createReadStream(filePath)
		.pipe(csv())
		.on('data', (row) => {
			csvData.push(row);
		})
		.on('end', () => {
			fs.unlinkSync(filePath);
			res.json({ success: true, data: csvData });
		});
});

app.get('/filter', (req, res) => {
	const { column, value } = req.query;
	const filteredData = csvData.filter(row => row[column] === value);
	res.json({ success: true, data: filteredData });
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
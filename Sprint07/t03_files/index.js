const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const File = require('./File');
const FileList = require('./FileList');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the static HTML file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Create a new file
app.post('/create-file', (req, res) => {
	const { fileName, fileContent } = req.body;
	const file = new File(fileName);
	file.write(fileContent);
	res.redirect('/');
});

// List all files
app.get('/list-files', (req, res) => {
	const fileList = new FileList();
	res.json({ files: fileList.getList() });
});

// Select a file to view its content
app.get('/select-file', (req, res) => {
	const { file } = req.query;
	const selectedFile = new File(file);
	const content = selectedFile.read();
	res.json({ fileName: file, content });
});

// Delete a file
app.post('/delete-file', (req, res) => {
	const { fileName } = req.body;
	const file = new File(fileName);
	file.delete();
	res.redirect('/');
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

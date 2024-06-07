const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NotePad = require('./NotePad');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const notePad = new NotePad();

app.post('/add-note', (req, res) => {
	const { name, importance, content } = req.body;
	const date = new Date().toLocaleString();
	const note = { date, name, importance, content };
	notePad.add(note);
	res.redirect('/');
});

app.get('/notes/:id', (req, res) => {
	const id = req.params.id;
	const note = notePad.get(id);
	if (!note) {
		res.status(404).send('Note not found');
	} else {
		res.send(`<h1>Note Details</h1><p>Date: ${note.date}</p><p>Name: ${note.name}</p><p>Importance: ${note.importance}</p><p>Content: ${note.content}</p>`);
	}
});

app.get('/delete-note/:id', (req, res) => {
	const id = req.params.id;
	notePad.remove(id);
	res.redirect('/');
});

app.get('/', (req, res) => {
	const notes = notePad.getAll();
	let html = '<h1>Notes</h1>';
	notes.forEach((note, index) => {
		html += `<div><p>${note.date} > <a href="/notes/${index}">${note.name}</a></p><p><a href="/delete-note/${index}">delete</a></p></div>`;
	});
	html += '<h2>Add Note</h2><form action="/add-note" method="post"><label for="name">Name:</label><input type="text" id="name" name="name" required><br><label for="importance">Importance:</label><select id="importance" name="importance" required><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select><br><label for="content">Content:</label><textarea id="content" name="content" required></textarea><br><button type="submit">Add Note</button></form>';
	res.send(html);
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

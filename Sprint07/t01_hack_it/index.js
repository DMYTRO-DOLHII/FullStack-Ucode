const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: 'your_secret_key',
	resave: false,
	saveUninitialized: true
}));

function hashPassword(password, salt) {
	return crypto.createHash('sha256').update(password + salt).digest('hex');
}

app.get('/', (req, res) => {
	if (req.session.hashedPassword) {
		res.send(`
            <h1>Guess the Password</h1>
            <p>Hashed Password: ${req.session.hashedPassword}</p>
            <form action="/guess" method="POST">
                <label for="guessPassword">Guess Password:</label>
                <input type="text" id="guessPassword" name="guessPassword" required>
                <button type="submit">Guess</button>
            </form>
            <form action="/clear" method="POST">
                <button type="submit">Clear Session</button>
            </form>
            ${req.session.message ? `<p style="color: ${req.session.messageColor};">${req.session.message}</p>` : ''}
        `);
	} else {
		res.sendFile(path.join(__dirname, 'index.html'));
	}
});

app.post('/save', (req, res) => {
	const { password, salt } = req.body;
	req.session.hashedPassword = hashPassword(password, salt);
	req.session.password = password;
	res.redirect('/');
});

app.post('/guess', (req, res) => {
	const { guessPassword } = req.body;
	if (req.session.password === guessPassword) {
		req.session.destroy(err => {
			if (err) {
				return res.status(500).send('Failed to clear session');
			}
			res.send(`
                <h1>Hacked!</h1>
                <a href="/">Save a new password</a>
            `);
		});
	} else {
		req.session.message = 'Access denied!';
		req.session.messageColor = 'red';
		res.redirect('/');
	}
});

app.post('/clear', (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return res.status(500).send('Failed to clear session');
		}
		res.redirect('/');
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

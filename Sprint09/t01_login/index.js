const express = require('express');
const session = require('express-session');
const User = require('./models/user');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = new User();
    const foundUser = await user.findByLogin(login);

    if (foundUser && foundUser.password === password) {
        req.session.user = foundUser;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid login or password' });
    }
});


app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`<h1>Welcome ${req.session.user.login}</h1><p>Status: ${req.session.user.status}</p><a href="/logout">Logout</a>`);
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

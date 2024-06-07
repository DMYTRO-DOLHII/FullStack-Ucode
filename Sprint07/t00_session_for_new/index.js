const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    if (req.session.hero) {
        res.send(`
            <h1>Hero Information</h1>
            <p>Real Name: ${req.session.hero.realName}</p>
            <p>Current Alias: ${req.session.hero.currentAlias}</p>
            <p>Age: ${req.session.hero.age}</p>
            <p>About: ${req.session.hero.about}</p>
            <p>Photo: <img src="${req.session.hero.photo}" alt="Hero Photo" style="max-width: 200px;"></p>
            <h2>Powers</h2>
            <p>Powers: ${req.session.hero.powers.join(', ')}</p>
            <p>Level of Control: ${req.session.hero.controlLevel}</p>
            <h2>Publicity</h2>
            <p>Publicity: ${req.session.hero.publicity.join(', ')}</p>
            <form action="/forget" method="POST">
                <button type="submit">Forget Hero</button>
            </form>
        `);
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.post('/submit', (req, res) => {
    const { realName, currentAlias, age, about, photo, powers, controlLevel, publicity } = req.body;
    req.session.hero = {
        realName,
        currentAlias,
        age,
        about,
        photo,
        powers: Array.isArray(powers) ? powers : [powers],
        controlLevel,
        publicity: Array.isArray(publicity) ? publicity : [publicity]
    };
    res.redirect('/');
});

app.post('/forget', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to forget session');
        }
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const app = express();
const port = 3000;

const user = new User();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
    const { login, password, confirmPassword, full_name, email } = req.body;
    let errorMessage = '';

    if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match.';
        return res.redirect(`/?error=${encodeURIComponent(errorMessage)}`);
    }

    const existingUser = await user.findUserByLogin(login);
    const existingEmail = await user.findUserByEmail(email);

    if (existingUser) {
        errorMessage = 'Login already exists.';
        return res.redirect(`/?error=${encodeURIComponent(errorMessage)}`);
    }

    if (existingEmail) {
        errorMessage = 'Email already exists.';
        return res.redirect(`/?error=${encodeURIComponent(errorMessage)}`);
    }

    await user.createUser({ login, password, full_name, email });
    return res.redirect('/?success=' + encodeURIComponent('User registered successfully.'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('./models/user'); // Import the User model

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public folder
app.set('view engine', 'html'); // If you are serving static HTML pages
app.use(session({
    secret: 'some_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initialize user model
const userModel = new User();

// Render login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Registration page
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

// Handle registration
app.post('/register', async (req, res) => {
    const { login, password, confirmPassword, full_name, email } = req.body;

    try {
        // Check if login or email already exists
        const existingLogin = await userModel.findByLogin(login);
        if (existingLogin) return res.send('Login already exists.');

        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail) return res.send('Email already exists.');

        // Create the user
        await userModel.create({ login, password, full_name, email });

        res.json({ success: true }); // Redirect to login after successful registration
    } catch (error) {
        res.send(error.message);
    }
});

// Handle login
app.post('/login', async (req, res) => {
    const { login, password } = req.body;

    console.log(login, password)

    try {
        const user = await userModel.findByLogin(login);
        if (!user) return res.send('Invalid login.');

        // Check if password matches
        const match = password === user.password;
        if (!match) return res.send('Invalid password.');

        // Set session and redirect to main page
        req.session.user = { id: user.id, login: user.login, status: user.status };
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Password reminder page
app.get('/password-reminder', (req, res) => {
    res.sendFile(__dirname + '/views/password_reminder.html');
});

// Handle password reminder
app.post('/password-reminder', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findByEmail(email);
        if (!user) return res.send('Email not found.');

        // Nodemailer to send password reminder email (For demo purposes)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dolgiy.dmitriyp@gmail.com',
                pass: 'hnml epmi cyzg qewr'
            }
        });

        let mailOptions = {
            from: 'dmytro.dolhii@gmail.com',
            to: user.email,
            subject: 'Password Reminder',
            text: `Hello, ${user.full_name}. Your password is: ${user.password}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.send(error.message);
    }
});

// Main page (only accessible if logged in)
app.get('/main', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.send(`Welcome, ${req.session.user.login}. You are logged in as ${req.session.user.status}.`);
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// 404 page for non-existent routes
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

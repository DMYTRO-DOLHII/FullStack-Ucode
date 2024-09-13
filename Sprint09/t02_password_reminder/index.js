const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const userModel = new User();

app.get('/', (req, res) => {
    // Option 1: Redirect to the password reminder page
    res.redirect('/password-reminder');
    
    // Option 2: Display a custom message (uncomment this part if you prefer it over redirect)
    // res.send('<h1>Welcome to the S.W.O.R.D. System!</h1><p><a href="/password-reminder">Go to Password Reminder</a></p>');
});

// Password reminder route
app.post('/password-reminder', async (req, res) => {
    const email = req.body.email;

    try {
        const user = await userModel.findByEmail(email);

        if (!user) {
            return res.status(400).send('User not found');
        }

        // Send the password reminder email
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

        console.log(user.email, mailOptions.from);

        await transporter.sendMail(mailOptions);

        res.send('Password reminder sent!');
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred while sending the email');
    }
});

// Serve the password reminder form
app.get('/password-reminder', (req, res) => {
    res.sendFile(__dirname + '/views/password_reminder.html');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

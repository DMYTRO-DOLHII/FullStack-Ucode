const express = require('express');
const User = require('../models/user');
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const sharp = require('sharp');

router.get('/', (req, res) => {
    if (req.session.data == undefined) {
        res.redirect('/login');
    } else {
        res.sendFile(process.cwd() + '/public/views/index.html');
    }
});

router.post('/', (req, res) => {
    res.send(JSON.stringify({ login: req.session.data.login }));
});

router.get('/main.js', (req, res) => {
    res.sendFile(process.cwd() + '/public/main.js');
});

router.get('/login', (req, res) => {
    res.sendFile(process.cwd() + '/public/views/login.html');
});

router.post('/login', (req, res) => {
    try {
        if (req.body.login === '' || req.body.password === '') {
            throw new Error('All fields must be filled!');
        }
        loginCheck = new User();
        loginCheck.findByLogin(req.body.login)
            .then(results => {
                if (results.length === 0) {
                    res.send(JSON.stringify({ status: 'ERROR', message: 'Wrong login or password' }));
                } else {
                    if (results[0].password === req.body.password) {
                        req.session.data = results[0];
                        res.send(JSON.stringify({ status: 'OK' }));
                    } else {
                        res.send(JSON.stringify({ status: 'ERROR', message: 'Wrong login or password' }));
                    }
                }
            })

    } catch (err) {
        res.send(JSON.stringify({ status: 'ERROR', message: err.message }));
    }
});

router.get('/registration', (req, res) => {
    res.sendFile(process.cwd() + '/public/views/register.html');
});

router.post('/registration', (req, res) => {
    try {
        if (req.body.login === '' || req.body.password === '') {
            throw new Error('All fields must be filled!');
        }
        loginCheck = new User();
        loginCheck.findByLogin(req.body.login)
            .then(results => {
                if (results.length != 0) {
                    res.send(JSON.stringify({ status: 'ERROR', message: 'Login already exists!' }));
                } else {
                    let user = new User(req.body.login, req.body.password);
                    user.save();
                    user.findByLogin(req.body.login).then(results => {
                        req.session.data = results[0];
                        res.send(JSON.stringify({ status: 'OK' }));
                    });
                }
            })

    } catch (err) {
        res.send(JSON.stringify({ status: 'ERROR', message: err.message }));
    }
});

router.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

router.get('/avatar/*.jpg', (req, res) => {
    let avatar = req.url.split('/')[2];
    let login = avatar.split('.')[0];
    let loginCheck = new User();
    loginCheck.findByLogin(login).then(results => {
        if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            let filePath = process.cwd() + '/public/avatars/' + avatar;
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    defaultFilePath = process.cwd() + '/public/images/default.png';
                    // File does not exist
                    fs.copyFile(defaultFilePath, filePath, (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Error copying file');
                            return;
                        }
                        else {
                            res.sendFile(filePath);
                        }
                    });
                }
                else {
                    res.sendFile(filePath);
                }
            });
        }
    });
});

router.post('/update', (req, res) => {
    // Get the file that was set to our field named "image"
    if (req.files === undefined || req.files === null) return res.redirect('/');
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.redirect('/');
    //console.log(image.mimetype);
    // If does not have image mime type prevent from uploading
    if (!(/^image/.test(image.mimetype))) return res.redirect('/');

    let size = 500;
    sharp(image.data)
        .metadata()
        .then(metadata => {
            if (metadata.width > metadata.height) {
                size = metadata.height;
            } else {
                size = metadata.width;
            }
            sharp(image.data)
                .resize({
                    width: size,
                    height: size,
                    fit: 'cover',
                    position: 'center'
                }).toFormat('jpg').toFile(process.cwd() + `/public/avatars/${req.session.data.login}.jpg`, (err, info) => {
                    if (err) {
                        console.error(err);
                        res.redirect('/');
                        return;
                    }
                    // All good
                    res.redirect('/');
                });
        });
});

router.get('/game', (req, res) => {
    if (req.session.data == undefined) {
        res.redirect('/login');
    } else {
        res.sendFile(process.cwd() + '/public/views/game.html');
    }
});

router.get('/game.css', (req, res) => {
    res.sendFile(process.cwd() + '/public/styles/game.css');
});

router.get('/main.js', (req, res) => {
    res.sendFile(process.cwd() + '/public/game.js');
});

module.exports = router;
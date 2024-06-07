const express = require('express');
const axios = require('axios');
const jsdom = require('jsdom');
const path = require('path');

const { JSDOM } = jsdom;
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/fetch-url', async (req, res) => {
	const { url } = req.body;
	try {
		const response = await axios.get(url);
		const dom = new JSDOM(response.data);
		const bodyContent = dom.window.document.body.innerHTML;

		res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Show Other Sites</title>
            </head>
            <body>
                <form action="/fetch-url" method="POST">
                    <label for="url">Enter URL:</label>
                    <input type="url" id="url" name="url" required>
                    <button type="submit">Go</button>
                </form>
                <div id="content">
                    ${bodyContent}
                </div>
            </body>
            </html>
        `);
	} catch (error) {
		res.status(500).send('Error fetching the URL. Please try again.');
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

const express = require('express');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = 3000;

const MARVEL_PUBLIC_KEY = "02cd29124e9cc098f24fe1e838c9e882";
const MARVEL_PRIVATE_KEY = "28b0947b610bf58ba7f0e00476d0afe2970fa40d";

app.use(express.static(path.join(__dirname)));

app.get('/fetch-marvel-data', async (req, res) => {
	console.log("Fetching data...");
	const timestamp = new Date().getTime();
	const hash = crypto.createHash('md5').update(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY).digest('hex');
	const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

	try {
		const response = await axios.get(url);
		const data = response.data.data.results;
		res.json(data);
	} catch (error) {
		res.status(500).send('Error fetching data from Marvel API');
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

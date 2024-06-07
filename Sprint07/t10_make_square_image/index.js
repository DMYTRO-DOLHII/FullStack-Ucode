const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const sharp = require("sharp");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/public", express.static(__dirname + "/"));
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/upload", async function (req, res) {
	const path = "./img.png";
	let url = req.query.url;
	request.head(url, async function () {
		request(url)
			.pipe(fs.createWriteStream(path))
			.on("close", await imageCheck);
	});
	function imageCheck() {
		let arr = [
			[
				[0, 0, 1],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 1],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 1],
			],
		];
		for (let i = 1; i <= 4; i++) {
			let img = sharp("img.png");
			if (i >= 2) {
				img = img.recomb(arr[i - 2]);
			}
			img.resize(250, 250).toFile(`img${i}.png`, function (err, info) {
				if (i === 4) {
					res.json({
						img: [`img1.png`, `img2.png`, `img3.png`, `img4.png`],
					});
				}
			});
		}
	}
});

app.get("/clear", function (req, res) {
	[`img1.png`, `img2.png`, `img3.png`, `img4.png`, `img.png`].forEach(elem => fs.unlinkSync(elem));
});


app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
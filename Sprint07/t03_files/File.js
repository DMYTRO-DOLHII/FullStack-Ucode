const fs = require('fs');
const path = require('path');

class File {
	constructor(fileName) {
		this.fileName = path.join(__dirname, 'tmp', fileName);
	}

	write(content) {
		if (!fs.existsSync('tmp')) {
			fs.mkdirSync('tmp');
		}
		fs.appendFileSync(this.fileName, content);
	}

	read() {
		return fs.readFileSync(this.fileName, 'utf-8');
	}

	delete() {
		fs.unlinkSync(this.fileName);
	}
}

module.exports = File;

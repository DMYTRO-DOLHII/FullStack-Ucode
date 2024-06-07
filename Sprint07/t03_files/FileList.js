const fs = require('fs');
const path = require('path');

class FileList {
	constructor() {
		this.directory = path.join(__dirname, 'tmp');
	}

	getList() {
		if (!fs.existsSync(this.directory)) {
			fs.mkdirSync(this.directory);
		}
		return fs.readdirSync(this.directory);
	}
}

module.exports = FileList;

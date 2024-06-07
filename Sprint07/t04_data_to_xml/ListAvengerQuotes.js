const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const AvengerQuote = require('./AvengerQuote');

class ListAvengerQuotes {
	constructor() {
		this.quotes = [];
	}

	addQuote(quote) {
		this.quotes.push(quote);
	}

	toXML(fileName) {
		let builder = new xml2js.Builder();
		const xml = builder.buildObject({ quotes: this.quotes });

		try {
			fs.writeFileSync(fileName, xml);
		} catch (err) {
			console.error(err);
		}
		return xml;
	}

	fromXML(fileName) {
		const fName = path.join(__dirname, fileName);
		if (fs.existsSync(fName)) {
			const data = fs.readFileSync(fName).toString();
			const parser = new xml2js.Parser();
			let result = '';
			parser.parseString(data, (err, data) => {
				if (err) {
					console.error(err);
				} else {
					result = data;
				}
			});
			return result;
		}
	}
}

module.exports = ListAvengerQuotes;
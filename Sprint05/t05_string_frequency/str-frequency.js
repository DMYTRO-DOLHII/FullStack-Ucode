
module.exports = class StrFrequency {
	constructor(str) {
		this.str = str;
	}

	letterFrequencies() {
		let frequencies = {};
		const newStr = this.str.replace(/[^a-zA-Z]/g, '').toUpperCase();

		for (let c of newStr) {
			if (frequencies[c]) {
				frequencies[c]++;
			} else {
				frequencies[c] = 1;
			}
		}

		return frequencies;
	}

	wordFrequencies() {
		if (this.str === '') return { '': 1 }

		let frequencies = {};
		const newStr = this.str.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
		const words = newStr.split(/\s+/).filter(word => word.length > 0);

		for (let w of words) {
			if (frequencies[w]) {
				frequencies[w]++;
			} else {
				frequencies[w] = 1;
			}
		}

		return frequencies;
	}

	reverseString() {
		return this.str.split('').reverse().join('');
	}
}

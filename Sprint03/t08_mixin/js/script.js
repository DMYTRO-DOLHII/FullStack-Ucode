// Mixin for house object created by HouseBuilder
const houseMixin = {
	wordReplace(oldWord, newWord) {
		this.description = this.description.replace(oldWord, newWord);
	},
	wordInsertAfter(existingWord, newWord) {
		const words = this.description.split(' ');
		const index = words.indexOf(existingWord);
		if (index !== -1 && index + 1 < words.length) {
			words.splice(index + 1, 0, newWord);
			this.description = words.join(' ');
		}
	},
	wordDelete(wordToDelete) {
		this.description = this.description.replace(new RegExp('\\b' + wordToDelete + '\\b', 'g'), '');
	},
	wordEncrypt() {
		this.description = this.description.replace(/[a-zA-Z]/g, function (char) {
			let charCode = char.charCodeAt(0);
			let offset = charCode <= 90 ? 65 : 97;
			return String.fromCharCode(((charCode - offset + 13) % 26) + offset);
		});
	},
	wordDecrypt() {
		this.wordEncrypt(); // Rot13 is its own inverse
	}
};

// Test case
const house = new houseBuilder('123 Main St', 'Cozy cottage with garden', 'John Doe', 100, 5);
console.log(house.description); // Cozy cottage with garden

// Assign house Mixin to houseBuilder
Object.assign(house, houseMixin);

// Test cases
house.wordReplace('cottage', 'house');
console.log(house.description); // Cozy house with garden
house.wordInsertAfter('house', 'and');
console.log(house.description); // Cozy house and with garden
house.wordDelete('and');
console.log(house.description); // Cozy house with garden
house.wordEncrypt();
console.log(house.description); // Pblm ubpfrg jvgu tnesra
house.wordDecrypt();
console.log(house.description); // Cozy house with garden

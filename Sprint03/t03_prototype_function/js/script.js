// Add the removeDuplicates method to the String prototype
String.prototype.removeDuplicates = function () {
	// Split the string into an array of words
	const words = this.split(/\s+/);

	// Remove duplicates and extra spaces
	const uniqueWords = [...new Set(words)];

	// Join the words back into a string
	return uniqueWords.join(' ');
};

// Test the implementation
let str = "Giant Spiders?   What’s next? Giant Snakes?";
console.log(str); // Giant Spiders?   What’s next? Giant Snakes?
str = str.removeDuplicates();
console.log(str); // Giant Spiders? What’s next? Snakes?
str = str.removeDuplicates();
console.log(str); // Giant Spiders? What’s next? Snakes?
str = ". . . . ? . . . . . . . . . . . ";
console.log(str); // . . . . ? . . . . . . . . . . .
str = str.removeDuplicates();
console.log(str); // . ?

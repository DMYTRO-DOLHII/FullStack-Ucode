// Define a function to print descriptions for numbers in a range
function checkDivision(beginRange = 1, endRange = 100) {
	for (let i = beginRange; i <= endRange; i++) {
		let description = i + ' -';
		if (i % 2 === 0) {
			description += ' is even,';
		}
		if (i % 3 === 0) {
			description += ' a multiple of 3,';
		}
		if (i % 10 === 0) {
			description += ' a multiple of 10,';
		}
		console.log(description.slice(0, -1)); // Remove the last comma
	}
}

// Prompt the user to enter the beginning and end of the range
let beginRange = parseInt(prompt("Enter the beginning of the range:"));
let endRange = parseInt(prompt("Enter the end of the range:"));

// Call the function with user input or default values
checkDivision(beginRange, endRange);

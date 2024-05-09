function concat(string1, string2) {
	if (string2 !== undefined) {
		// If two strings are provided, concatenate them and return
		return string1 + ' ' + string2;
	} else {
		// If only one string is provided, return a function that prompts for the second string
		let count = 0; // Initialize the count property
		return function (str) {
			count++; // Increment the count property
			return string1 + ' ' + str;
		};
	}
}

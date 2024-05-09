function checkBrackets(str) {
	// Check if the input is a string
	if (typeof str !== 'string') {
		return -1;
	}

	// Initialize count variables for open and close brackets
	let openCount = 0;
	let closeCount = 0;

	// Iterate through the characters in the string
	for (let char of str) {
		if (char === '(') {
			// Increment the count for open brackets
			openCount++;
		} else if (char === ')') {
			// Increment the count for close brackets
			closeCount++;
		}
	}

	// If counts are unequal or either count is zero, return -1
	if (openCount !== closeCount || openCount === 0 || closeCount === 0) {
		return -1;
	}

	// Return the absolute difference between counts divided by 2
	return Math.abs(openCount - closeCount) / 2;
}

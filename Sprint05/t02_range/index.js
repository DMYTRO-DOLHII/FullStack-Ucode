exports.checkDivision = function (begin = 1, end = 60) {
	for (let i = begin; i <= end; i++) {
		let result = " - ";

		if (i % 2 === 0) {
			result = " is divisible by 2";
		}

		if (i % 3 === 0 && i % 2 !== 0) {
			result = " is a divisible by 3";
		}
		else if (i % 3 === 0) {
			result += ", is divisible by 3";
		}

		if (i % 10 === 0 && !(i % 2 === 0 || i % 3 === 0)) {
			result += " is divisible by 10";
		}
		else if (i % 10 === 0 && (i % 2 === 0 || i % 3 === 0)) {
			result += ", is divisible by 10"
		}

		console.log(i + result)
	}
}
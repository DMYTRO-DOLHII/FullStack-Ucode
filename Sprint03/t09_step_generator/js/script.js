// Generator function for step calculation
function* stepGenerator() {
	let result = 1;
	while (true) {
		const input = prompt(`Previous result: ${result}. Enter a new number:`);
		if (input === null) {
			console.log('Generator stopped.');
			break;
		}
		const num = Number(input);
		if (isNaN(num)) {
			console.error('Invalid number!');
			continue;
		}
		result += num;
		if (result > 10000) {
			result = 1;
		}
		yield result;
	}
}

// Run the generator
const generator = stepGenerator();
for (const value of generator) {
	console.log(`Generated value: ${value}`);
}

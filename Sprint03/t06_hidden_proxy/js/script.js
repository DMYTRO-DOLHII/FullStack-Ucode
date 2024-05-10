// Create validator
const validator = {
	get: function (target, property) {
		console.log(`Trying to access the property '${property}'...`);
		return target[property];
	},
	set: function (target, property, value) {
		console.log(`Setting value '${value}' to '${property}'`);
		if (property === 'age') {
			if (!Number.isInteger(value)) {
				throw new TypeError("The age is not an integer");
			}
			if (value < 0 || value > 200) {
				throw new RangeError("The age is invalid");
			}
		}
		target[property] = value;
		return true;
	}
};

// Create person proxy
const person = new Proxy({}, validator);

// Test cases
try {
	person.age = 100; // Setting value '100' to 'age'
	console.log(person.age); // Trying to access the property 'age'...
	// 100
	person.gender = "male"; // Setting value 'male' to 'gender'
	person.age = 'young'; // Uncaught TypeError: The age is not an integer
	person.age = 300; // Uncaught RangeError: The age is invalid
} catch (error) {
	console.error(error);
}

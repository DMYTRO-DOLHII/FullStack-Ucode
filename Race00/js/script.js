const historyElement = document.getElementById("history");
const outputElement = document.getElementById("output");
const modeSwitch = document.getElementById("mode-switch");
const hexButtons = document.getElementById("hex-buttons");

const MAX_LENGTH = 15;

let numberLen = 0;
let isDecimal = false;
let isOperatorLastChar = false;

// Constants for Pi and Euler's Number
const PI_VALUE = Math.PI;
const E_VALUE = Math.E;

// Check input string for errors
function checkInput(input) {
	let stack = [];
	let lastChar = '';
	let wasOperator = true; // Indicates if the last character was an operator (useful for negative numbers)

	for (let i = 0; i < input.length; i++) {
		let char = input[i];

		if (/\d/.test(char)) {
			wasOperator = false;
		} else if (char === '(') {
			if (i > 0 && /\d/.test(input[i - 1])) {
				return false;
			}
			stack.push(char);
			wasOperator = true;
		} else if (char === ')') {
			if (stack.length === 0 || wasOperator) {
				return false;
			}
			stack.pop();
			wasOperator = false;
		} else if (['+', '-', '*', '/'].includes(char)) {
			if (wasOperator && char !== '-') {
				return false;
			}
			wasOperator = true;
		} else if (char === '.') {
			if (wasOperator) {
				return false;
			}
			let lastNumber = input.slice(0, i).split(/[\+\-\*\/\(\)]/).pop();
			if (lastNumber.includes('.')) {
				return false;
			}
			wasOperator = false;
		} else {
			return false;
		}
		lastChar = char;
	}
	return stack.length === 0 && !wasOperator;
}

// Check if char is Digit
function isDigit(char) {
	return char >= '0' && char <= '9';
}

// Check if char is Operator
function isOperator(char) {
	return char === '+' || char === '-' || char === '*' || char === '/';
}

// Append Decimal into output string
function appendDecimal() {
	if (!(outputElement.innerText.slice(-1) === ".") && !isDecimal) {
		outputElement.innerText += ".";
		isDecimal = true;
	}
}

// Append Digit into output string
function appendNumber(number) {
	if (numberLen == MAX_LENGTH) return;

	if (outputElement.innerText === "0") {
		outputElement.innerText = number;
	} else {
		outputElement.innerText += number;
	}

	isOperatorLastChar = false;
	numberLen++;
}

// Set on-click function for each digit and  decimal
document.querySelectorAll(".number").forEach(button => {
	button.addEventListener("click", function () {
		if (button.innerText === ".") {
			appendDecimal();
		} else {
			appendNumber(button.innerText);
		}

		isOperatorLastChar = false;
	});
});

// Tokenize input string
function tokenize(input) {
	const tokens = [];
	let numberBuffer = [];
	let lastChar = '';

	const flushNumberBuffer = () => {
		if (numberBuffer.length > 0) {
			tokens.push(numberBuffer.join(''));
			numberBuffer = [];
		}
	};

	for (let i = 0; i < input.length; i++) {
		const char = input[i];

		if (isDigit(char) || char === '.') {
			numberBuffer.push(char);
		} else {
			flushNumberBuffer();
			if (char === '-' && (i === 0 || (isOperator(lastChar) && lastChar !== ')'))) {
				numberBuffer.push(char);
			} else if (char === '+' || char === '-' || char === '*' || char === '/' || char === '(' || char === ')') {
				tokens.push(char);
			}
		}
		lastChar = char;
	}

	flushNumberBuffer();
	return tokens;
}

// Evaluate the input string using the Shunting Yard algorithm and RPN evaluation
function evaluate(input) {
	const tokens = tokenize(input);
	const outputQueue = [];
	const operatorStack = [];

	const precedence = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2
	};

	const associativity = {
		'+': 'L',
		'-': 'L',
		'*': 'L',
		'/': 'L'
	};

	tokens.forEach(token => {
		if (isDigit(token[0]) || (token.length > 1 && isDigit(token[1]))) {
			outputQueue.push(token);
		} else if (token in precedence) {
			while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(' &&
				((associativity[token] === 'L' && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) ||
					(associativity[token] === 'R' && precedence[token] < precedence[operatorStack[operatorStack.length - 1]]))) {
				outputQueue.push(operatorStack.pop());
			}
			operatorStack.push(token);
		} else if (token === '(') {
			operatorStack.push(token);
		} else if (token === ')') {
			while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
				outputQueue.push(operatorStack.pop());
			}
			operatorStack.pop(); // Remove the '(' from the stack
		}
	});

	while (operatorStack.length > 0) {
		outputQueue.push(operatorStack.pop());
	}

	return evaluateRPN(outputQueue);
}

// Evaluate the Reverse Polish Notation (RPN) queue
function evaluateRPN(rpnQueue) {
	const stack = [];

	rpnQueue.forEach(token => {
		if (isDigit(token[0]) || (token.length > 1 && isDigit(token[1]))) {
			stack.push(parseFloat(token));
		} else if (token in { '+': 1, '-': 1, '*': 1, '/': 1 }) {
			const b = stack.pop();
			const a = stack.pop();
			switch (token) {
				case '+': stack.push(a + b); break;
				case '-': stack.push(a - b); break;
				case '*': stack.push(a * b); break;
				case '/': stack.push(a / b); break;
			}
		}
	});

	return stack[0];
}

// Add operator sign into output string
function addOperator(char) {
	if (isOperatorLastChar) {
		outputElement.innerText = outputElement.innerText.slice(0, -1) + char;
	} else {
		outputElement.innerText += char;
		isOperatorLastChar = true;
	}

	isDecimal = false;
	numberLen = 0;
}

// Set on-click function for '+'
document.getElementById("add").addEventListener("click", function () {
	addOperator("+");
});

// Set on-click function for '-'
document.getElementById("subtract").addEventListener("click", function () {
	addOperator("-");
});

// Set on-click function for '/'
document.getElementById("divide").addEventListener("click", function () {
	addOperator("/");
});

// Set on-click function for '*'
document.getElementById("multiply").addEventListener("click", function () {
	addOperator("*");
});

// Set on-click function for equals sign
document.getElementById("equals").addEventListener("click", function () {
	let output = outputElement.innerText;

	if (checkInput(output)) {
		try {
			let result = evaluate(output);
			outputElement.innerText = result;
			historyElement.innerText = output;

			if (result.toString().includes(".")) {
				isDecimal = true;
			} else {
				isDecimal = false;
			}

			isOperatorLastChar = false;
		} catch (error) {
			console.error("Error: Invalid calculation", error);
			outputElement.innerText = "Error";
		}
	} else {
		console.error("Error: Invalid input data");
		outputElement.innerText = "Error";
	}
})

// Set on-click function for clear sign
document.getElementById("clear").addEventListener("click", function () {
	outputElement.innerText = "0";
	historyElement.innerText = "";

	numberLen = 0;
	isOperatorLastChar = false;
	isDecimal = false;
});

// Set on-click function for open paren sign
document.getElementById("openParen").addEventListener("click", function () {
	outputElement.innerText += "(";
	isDecimal = false;
	isOperatorLastChar = false;
});

// Set on-click function for close paren sign
document.getElementById("closeParen").addEventListener("click", function () {
	outputElement.innerText += ")";
	isDecimal = false;
	isOperatorLastChar = false;
});

// Keydown event listener for keyboard input
document.addEventListener('keydown', function (event) {
	const key = event.key;

	if (isDigit(key)) {
		appendNumber(key);
	} else if (key === '.') {
		appendDecimal();
	} else if (key === '+') {
		addOperator('+');
	} else if (key === '-') {
		addOperator('-');
	} else if (key === '*') {
		addOperator('*');
	} else if (key === '/') {
		addOperator('/');
	} else if (key === '(') {
		document.getElementById("openParen").click();
	} else if (key === ')') {
		document.getElementById("closeParen").click();
	} else if (key === '=' || key === 'Enter') {
		event.preventDefault(); // Prevent form submission if inside a form
		document.getElementById("equals").click();
	} else if (key === 'Backspace') {
		outputElement.innerText = outputElement.innerText.slice(0, -1);
		if (outputElement.innerText === '') {
			outputElement.innerText = '0';
		}
	}

	console.log(outputElement.innerText);
});

// Convert Length function
function convertLength() {
	const lengthInMeters = parseFloat(outputElement.innerText);
	if (isNaN(lengthInMeters)) {
		alert("Error: Invalid input");
		return;
	}
	// Conversion factors
	const metersToCentimeters = 100;
	const metersToKilometers = 0.001;

	// Perform conversions
	const lengthInCentimeters = lengthInMeters * metersToCentimeters;
	const lengthInKilometers = lengthInMeters * metersToKilometers;

	// Display results in an alert
	alert(`${lengthInMeters} m = ${lengthInCentimeters.toFixed(2)} cm = ${lengthInKilometers.toFixed(4)} km`);
}

// Convert Weight function
function convertWeight() {
	const weightInKilograms = parseFloat(outputElement.innerText);
	if (isNaN(weightInKilograms)) {
		alert("Error: Invalid input");
		return;
	}
	// Conversion factors
	const kilogramsToGrams = 1000;
	const kilogramsToTonnes = 0.001;

	// Perform conversions
	const weightInGrams = weightInKilograms * kilogramsToGrams;
	const weightInTonnes = weightInKilograms * kilogramsToTonnes;

	// Display results in an alert
	alert(`${weightInKilograms} kg = ${weightInGrams.toFixed(2)} g = ${weightInTonnes.toFixed(4)} tonnes`);
}

// Convert Area function
function convertArea() {
	const areaInSquareMeters = parseFloat(outputElement.innerText);
	if (isNaN(areaInSquareMeters)) {
		alert("Error: Invalid input");
		return;
	}
	// Conversion factors
	const squareMetersToSquareCentimeters = 10000;
	const squareMetersToSquareKilometers = 0.000001;
	const squareMetersToHectares = 0.0001;

	// Perform conversions
	const areaInSquareCentimeters = areaInSquareMeters * squareMetersToSquareCentimeters;
	const areaInSquareKilometers = areaInSquareMeters * squareMetersToSquareKilometers;
	const areaInHectares = areaInSquareMeters * squareMetersToHectares;

	// Display results in an alert
	alert(`${areaInSquareMeters} m² = ${areaInSquareCentimeters.toFixed(2)} cm² = ${areaInSquareKilometers.toFixed(6)} km² = ${areaInHectares.toFixed(4)} hectares`);
}

// Set on-click function for Convert Length button
document.getElementById("convertLength").addEventListener("click", convertLength);

// Set on-click function for Convert Weight button
document.getElementById("convertWeight").addEventListener("click", convertWeight);

// Set on-click function for Convert Area button
document.getElementById("convertArea").addEventListener("click", convertArea);


// Plus-Minus Sign Function
function toggleSign() {
	let currentValue = parseFloat(outputElement.innerText);
	if (isNaN(currentValue)) {
		alert("Error: Invalid input");
		return;
	}

	// Toggle the sign
	currentValue = -currentValue;

	// Update the output
	outputElement.innerText = currentValue.toString();
}

// Percent Sign Function
function convertToPercent() {
	let currentValue = parseFloat(outputElement.innerText);
	if (isNaN(currentValue)) {
		alert("Error: Invalid input");
		return;
	}

	// Convert to percent
	currentValue = currentValue / 100;

	// Update the output
	outputElement.innerText = currentValue.toString();
}

// Set on-click function for Plus-Minus button
document.getElementById("sign").addEventListener("click", toggleSign);

// Set on-click function for Percent button
document.getElementById("percent").addEventListener("click", convertToPercent);

// Insert Pi into the output
function insertPi() {
	if (outputElement.innerText === "0" || isOperatorLastChar) {
		outputElement.innerText = PI_VALUE.toString();
	} else {
		outputElement.innerText += PI_VALUE.toString();
	}
	isOperatorLastChar = false;
}

// Insert Euler's Number into the output
function insertE() {
	if (outputElement.innerText === "0" || isOperatorLastChar) {
		outputElement.innerText = E_VALUE.toString();
	} else {
		outputElement.innerText += E_VALUE.toString();
	}
	isOperatorLastChar = false;
}

// Set on-click function for Pi button
document.getElementById("pi").addEventListener("click", insertPi);

// Set on-click function for Euler's Number button
document.getElementById("e").addEventListener("click", insertE);

// Compute the Square Root of the current value
function computeSquareRoot() {
	const inputValue = parseFloat(outputElement.innerText);
	if (inputValue < 0) {
		alert("Cannot compute square root of a negative number");
		return;
	}
	const result = Math.sqrt(inputValue);
	alert("Square Root: " + result);
}

// Compute the Factorial of the current value
function computeFactorial() {
	const inputValue = parseFloat(outputElement.innerText);
	if (!Number.isInteger(inputValue) || inputValue < 0) {
		alert("Factorial is defined only for non-negative integers");
		return;
	}
	let result = 1;
	for (let i = 2; i <= inputValue; i++) {
		result *= i;
	}
	alert("Factorial: " + result);
}

// Compute the Power of the current value raised to a specified exponent
function computePower() {
	const inputValue = parseFloat(outputElement.innerText);
	const exponent = prompt("Enter the exponent:");
	if (exponent === null) return; // User cancelled
	const parsedExponent = parseFloat(exponent);
	if (isNaN(parsedExponent)) {
		alert("Invalid exponent");
		return;
	}
	const result = Math.pow(inputValue, parsedExponent);
	alert("Power: " + result);
}

// Set on-click function for Square Root button
document.getElementById("squareRoot").addEventListener("click", computeSquareRoot);

// Set on-click function for Factorial button
document.getElementById("factorial").addEventListener("click", computeFactorial);

// Set on-click function for Power button
document.getElementById("exponent").addEventListener("click", computePower);

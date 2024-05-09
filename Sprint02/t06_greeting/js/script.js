// Prompt the user to enter their first name and last name
let firstName = prompt("Enter your first name:");
let lastName = prompt("Enter your last name:");

// Check if the input is valid
if (!isNaN(firstName) || !isNaN(lastName) || firstName === "" || lastName === "") {
	console.log("Wrong input!");
	alert("Wrong input!");
} else {
	// Capitalize the first letter of the first and last name if it is not
	firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

	// Greet the user using their full name
	let fullName = firstName + " " + lastName;
	console.log("Hello, " + fullName + "!");
	alert("Hello, " + fullName + "!");
}

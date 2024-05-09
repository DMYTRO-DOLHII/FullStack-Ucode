// Prompt the user to enter an animal name
var animal = prompt("What animal is the superhero most similar to?");
// Validate animal input
if (!/^[a-zA-Z]{1,20}$/.test(animal)) {
	alert("Error: Animal name must contain only letters and be 1 to 20 characters long.");
} else {
	// Prompt the user to enter gender
	var gender = prompt("Is the superhero male or female? Leave blank if unknown or other.");
	// Validate gender input
	if (gender && !/^(male|female)$/i.test(gender)) {
		alert("Error: Gender must be male, female, or blank.");
	} else {
		// Prompt the user to enter age
		var age = prompt("How old is the superhero?");
		// Validate age input
		if (!/^\d{1,5}$/.test(age)) {
			alert("Error: Age must contain only digits and be 1 to 5 characters long.");
		} else {
			// Generate superhero description based on gender and age
			var description;
			if (gender && gender.toLowerCase() === "male") {
				description = (parseInt(age) < 18) ? "boy" : "man";
			} else if (gender && gender.toLowerCase() === "female") {
				description = (parseInt(age) < 18) ? "girl" : "woman";
			} else {
				description = (parseInt(age) < 18) ? "kid" : "hero";
			}
			// Display superhero name
			alert("The superhero name is: " + animal + "-" + description + "!");
		}
	}
}

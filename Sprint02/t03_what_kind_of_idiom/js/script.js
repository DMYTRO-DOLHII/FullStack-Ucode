// Prompt the user to enter a number from 1 to 10
var userInput;
do {
	userInput = prompt("Please enter a number from 1 to 10:");
	userInput = Number(userInput);
} while (isNaN(userInput) || userInput < 1 || userInput > 10);

// Generate idiom based on the input value
var idiom;
switch (userInput) {
	case 1:
		idiom = "Back to square 1";
		break;
	case 2:
		idiom = "Goody two-shoes";
		break;
	case 3:
	case 6:
		idiom = "Two's company, three's a crowd";
		break;
	case 4:
	case 9:
		idiom = "Counting sheep";
		break;
	case 5:
		idiom = "Take five";
		break;
	case 7:
		idiom = "Seventh heaven";
		break;
	case 8:
		idiom = "Behind the eight-ball";
		break;
	case 10:
		idiom = "Cheaper by the dozen";
		break;
}

// Display the idiom
alert(idiom);

class Human {
	constructor(firstName, lastName, gender, age, calories) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.age = age;
		this.calories = calories;
		this.hungryTimeout = setTimeout(() => {
			this.makeHungry();
		}, 5000);
	}

	makeHungry() {
		console.log("I'm hungry!");
	}

	sleepFor(seconds) {
		console.log(`I'm sleeping for ${seconds} seconds...`);
		setTimeout(() => {
			console.log("I'm awake now");
		}, seconds * 1000);
	}

	feed() {
		console.log("Nom nom nom...");
		setTimeout(() => {
			this.calories += 200;
			if (this.calories > 500) {
				console.log("I'm not hungry.");
			} else {
				console.log("I'm still hungry.");
			}
		}, 10000);
	}

	turnIntoSuperhero() {
		if (this.calories > 500) {
			console.log("Turning into superhero...");
			document.getElementById('human').style.display = 'none';
			document.getElementById('superhero').style.display = 'block';
		} else {
			console.log("Not enough calories to turn into a superhero.");
		}
	}
}

class Superhero extends Human {
	fly() {
		console.log("I'm flying!");
		setTimeout(() => {
			console.log("Flying done!");
		}, 10000);
	}

	fightWithEvil() {
		console.log("Khhhh-chh... Bang-g-g-g... Evil is defeated!");
	}
}

const human = new Human("John", "Doe", "Male", 30, 300);
const superhero = new Superhero("Jane", "Doe", "Female", 25, 700);

function sleepFor() {
	const seconds = prompt("Enter the number of seconds to sleep:");
	human.sleepFor(seconds);


	var gifText = document.getElementById("gifText");
	gifText.innerHTML = "Sleeping...";

	var sleepImg = document.getElementById("sleepImg");
	sleepImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1FYjlWebxHVv09BTxfOy3BU35LBeXkgAZj7uEHG1WA&s";

	setTimeout(function () {
		sleepImg.src = '';
		gifText.innerHTML = '';
	}, seconds * 1000)
}


function feed() {
	human.feed();
	document.getElementById("calories").innerHTML = 'Calories: ' + human.calories;

	// Get the image element
	var gifText = document.getElementById("gifText");
	gifText.innerHTML = "Eating. Am am am am...";

	var gifImage = document.getElementById("gifImage");

	// Set the source of the image to the GIF link
	gifImage.src = "https://media.tenor.com/sqtBgXVRR_4AAAAM/mellstroy.gif";

	setTimeout(function () {
		gifText.innerHTML = '';
		gifImage.src = '';
	}, 7000)
}


function turnIntoSuperhero() {
	human.turnIntoSuperhero();
}

function fly() {
	superhero.fly();
}

function fightWithEvil() {
	superhero.fightWithEvil();

	var fightGif = document.getElementById("fightGif");

	// Set the source of the image to the GIF link
	fightGif.src = "https://media.discordapp.net/attachments/1209212920748314665/1238448842920431616/1430074407995.601.gif?ex=663f52dd&is=663e015d&hm=e4fb9c3bcd477bf99fa16f5cdc7074025c436ec419608f172c9ae9437d18d62b&=";

	setTimeout(function () {
		gifText.innerHTML = '';
		fightGif.src = '';
	}, 7000)
}

// Display human's properties
document.getElementById('firstName').innerText += human.firstName;
document.getElementById('lastName').innerText += human.lastName;
document.getElementById('gender').innerText += human.gender;
document.getElementById('age').innerText += human.age;
document.getElementById('calories').innerText += human.calories;

// Display superhero's properties
document.getElementById('firstNameSuperhero').innerText += superhero.firstName;
document.getElementById('lastNameSuperhero').innerText += superhero.lastName;
document.getElementById('genderSuperhero').innerText += superhero.gender;
document.getElementById('ageSuperhero').innerText += superhero.age;
document.getElementById('caloriesSuperhero').innerText += superhero.calories;

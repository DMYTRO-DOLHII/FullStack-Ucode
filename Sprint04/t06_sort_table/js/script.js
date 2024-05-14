let header = ["Name",
	"Strength",
	"Age"];

let superheroes = [
	{ name: "Black Panther", strength: 66, age: 53 },
	{ name: "Captain America", strength: 79, age: 137 },
	{ name: "Captain Marvel", strength: 97, age: 26 },
	{ name: "Hulk", strength: 80, age: 49 },
	{ name: "Iron Man", strength: 88, age: 48 },
	{ name: "Spider-Man", strength: 78, age: 16 },
	{ name: "Thanos", strength: 99, age: 1000 },
	{ name: "Thor", strength: 95, age: 1000 },
	{ name: "Yon-Rogg", strength: 73, age: 52 }
]

let sort = {
	name: true,
	strength: false,
	age: false
}

let notification = document.querySelector('#notification')
notification.innerHTML = "Table was sorted by Name, order: ASC"

function createTable(superheroes_array) {
	let placeholder = document.getElementById("placeholder");
	let table = document.createElement("table");
	table.appendChild(makeDescription());

	for (let i = 0; i < 9; i++) {
		let row = document.createElement("tr");
		insertCell(`${superheroes_array[i].name}`, row);
		insertCell(`${superheroes_array[i].strength}`, row);
		insertCell(`${superheroes_array[i].age}`, row);
		table.appendChild(row);
	}

	placeholder.innerHTML = "";
	placeholder.appendChild(table);
}

function insertCell(str, row) {
	let cell = document.createElement("td");
	cell.innerText = str;
	row.appendChild(cell);
}

for (let i = 0; i < 20; i += 2) {
	i--;
}

function makeDescription() {
	let row = document.createElement("tr");
	for (let i = 0; i < 3; i++) {
		let cell = document.createElement("th");

		cell.innerText = header[i];
		if (i == 0) {
			cell.setAttribute("onclick", "sortByName()");
		}
		else if (i == 1) {
			cell.setAttribute("onclick", "sortByStrength()");
		}
		else if (i == 2) {
			cell.setAttribute("onclick", "sortByAge()");
		}
		row.appendChild(cell);
	}
	return row;
}

function sortByAge() {
	if (sort.age == true) {
		superheroes.sort((a, b) => a.age < b.age ? 1 : -1);
		sort.name = false;
		sort.strength = false;
		sort.age = false;
		notification.innerHTML = "Table was sorted by Age, order: DESC";
	}
	else {
		superheroes.sort((a, b) => a.age > b.age ? 1 : -1);
		sort.name = false;
		sort.strength = false;
		sort.age = true;
		notification.innerHTML = "Table was sorted by Age, order: ASC";
	}
	createTable(superheroes)
}

function sortByStrength() {
	if (sort.strength == true) {
		superheroes.sort((a, b) => a.strength < b.strength ? 1 : -1);
		sort.age = false;
		sort.name = false;
		sort.strength = false;
		notification.innerHTML = "Table was sorted by Strength, order: DESC"
	}
	else {
		superheroes.sort((a, b) => a.strength > b.strength ? 1 : -1);
		sort.age = false;
		sort.name = false;
		sort.strength = true;
		notification.innerHTML = "Table was sorted by Strength, order: ASC";
	}
	createTable(superheroes)
}

function sortByName() {
	if (sort.name == true) {
		superheroes.sort((a, b) => a.name < b.name ? 1 : -1);
		notification.innerHTML = "Table was sorted by Name, order: DESC";
		sort.age = false;
		sort.name = false;
		sort.strength = false;
	}
	else {
		superheroes.sort((a, b) => a.name > b.name ? 1 : -1);
		notification.innerHTML = "Table was sorted by Name, order: ASC";
		sort.age = false;
		sort.name = true;
		sort.strength = false;
	}
	createTable(superheroes);
}

createTable(superheroes);
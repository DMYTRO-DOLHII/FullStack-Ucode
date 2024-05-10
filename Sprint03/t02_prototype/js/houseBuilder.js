// Define the prototype for houseBlueprint
const houseBlueprint = {
	address: '',
	date: new Date(),
	description: '',
	owner: '',
	size: 0,
	getDaysToBuild: function () {
		return this.size / this._building_speed;
	}
};

// Define the houseBuilder class
function houseBuilder(address, description, owner, size, roomCount) {
	this.address = address;
	this.description = description;
	this.owner = owner;
	this.size = size;
	this.roomCount = roomCount;
}

// Inherit from houseBlueprint
houseBuilder.prototype = houseBlueprint;
houseBuilder.prototype._building_speed = 0.5; // meters squared per day

// Test the implementation
const house = new houseBuilder('88 Crescent Avenue', 'Spacious town house with wood flooring, 2-car garage, and a back patio.', 'J. Smith', 110, 5);
console.log(house.address); // '88 Crescent Avenue'
console.log(house.description); // 'Spacious town house with wood flooring, 2-car garage, and a back patio.'
console.log(house.size); // 110
console.log(house.date.toDateString()); // [the current date], for example: 'Tue Aug 11 2020'
console.log(house.owner); // J. Smith
console.log(house._building_speed); // 0.5
console.log(house.getDaysToBuild()); // 220
console.log(house.roomCount);

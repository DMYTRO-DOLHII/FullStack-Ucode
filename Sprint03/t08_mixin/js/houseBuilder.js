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

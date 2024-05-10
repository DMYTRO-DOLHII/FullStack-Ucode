// Define the Building class
class Building {
	constructor(floors, material, address) {
		this.floors = floors;
		this.material = material;
		this.address = address;
	}

	toString() {
		return `Floors: ${this.floors}\nMaterial: ${this.material}\nAddress: ${this.address}`;
	}
}

// Define the Tower class that inherits from Building
class Tower extends Building {
	constructor(floors, material, address) {
		super(floors, material, address);
		this.hasElevator = false;
		this.arcCapacity = 0;
		this.height = 0;
	}

	getFloorHeight() {
		if (this.floors > 0 && this.height > 0) {
			return this.height / this.floors;
		} else {
			return 0;
		}
	}

	toString() {
		return `${super.toString()}\nElevator: ${this.hasElevator ? '+' : '-'}\nArc reactor capacity: ${this.arcCapacity}\nHeight: ${this.height}\nFloor height: ${this.getFloorHeight()}`;
	}
}

// Test code
const starkTower = new Tower(93, 'Different', 'Manhattan, NY');
starkTower.hasElevator = true;
starkTower.arcCapacity = 70;
starkTower.height = 1130;
console.log(starkTower.toString());

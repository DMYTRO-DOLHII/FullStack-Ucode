class HardWorker {
	constructor(name, age, salary) {
		this.name = name;
		this.age = age;
		this.salary = salary;
	}

	toObject() {
		return {
			name: this.name,
			age: this.age,
			salary: this.salary
		};
	}
}

export { HardWorker }
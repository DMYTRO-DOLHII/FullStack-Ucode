class Avenger {
	constructor(name, alias, gender, age, powers, hp) {
		this.name = name;
		this.alias = alias;
		this.gender = gender;
		this.age = age;
		this.powers = powers;
		this.hp = hp;
	}

	toString() {
		return `name: ${this.name}\ngender: ${this.gender}\nage: ${this.age}`;
	}

	showPowers() {
		return `${this.alias.toUpperCase()}\n${this.powers.join('\n')}`;
	}
}

module.exports = { Avenger };

const { Avenger } = require('./Avenger');

class Team {
	constructor(id, avengers) {
		this.id = id;
		this.avengers = avengers;
	}

	battle({ damage }) {
		this.avengers.forEach(avenger => {
			avenger.hp -= damage;
		});
		this.avengers = this.avengers.filter(avenger => avenger.hp > 0);
	}

	clone() {
		const clonedAvengers = this.avengers.map(avenger =>
			new Avenger(avenger.name, avenger.alias, avenger.gender, avenger.age, avenger.powers, avenger.hp)
		);
		return new Team(this.id, clonedAvengers);
	}

	calculateLosses(clonedTeam) {
		const originalCount = clonedTeam.avengers.length;
		const currentCount = this.avengers.length;
		const losses = originalCount - currentCount;

		if (losses === 0) {
			console.log("We haven't lost anyone in this battle!");
		} else {
			console.log(`In this battle we lost ${losses} Avenger${losses > 1 ? 's' : ''}.`);
		}
	}
}

module.exports = { Team };

function avenger(option) {
	function Avenger() {
		return [
			option.alias.toUpperCase(),
			option.powers.join('\n')
		].join('\n');
	}

	Avenger.toString = () => [
		`name: ${option.name}`,
		`gender: ${option.gender}`,
		`age: ${option.age}`
	].join('\n');

	return Avenger;
}

module.exports = { Avenger: avenger };

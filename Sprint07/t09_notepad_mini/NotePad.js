class NotePad {
	constructor() {
		this.notes = [];
	}

	add(note) {
		this.notes.push(note);
	}

	get(index) {
		return this.notes[index];
	}

	remove(index) {
		this.notes.splice(index, 1);
	}

	getAll() {
		return this.notes;
	}
}

module.exports = NotePad;

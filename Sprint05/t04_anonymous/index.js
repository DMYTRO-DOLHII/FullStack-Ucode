exports.getAnonymous = function (name, alias, affiliation) {
	return new class {
		#name;
		#alias;
		#affiliation;

		constructor(name, alias, affiliation) {
			this.#name = name;
			this.#alias = alias;
			this.#affiliation = affiliation;
		}

		get name() {
			return this.#name;
		}
		get alias() {
			return this.#alias;
		}
		get affiliation() {
			return this.#affiliation;
		}
	}(name, alias, affiliation);
}
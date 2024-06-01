const { LLData } = require("./LLData");

class LList {
	head = null;
	tail = null;
	counter = 0;

	add(value) {
		const nextElem = new LLData(value);
		if (!this.head) {
			this.head = nextElem;
		}
		if (this.tail) {
			this.tail.next = nextElem;
			this.tail = nextElem;
			return;
		}
		this.tail = nextElem;
	}

	addFromArray(arrayOfData) {
		arrayOfData.map(item => this.add(item));
	}

	remove(value) {
		if (this.head.data == value) {
			this.head = this.head.next;
			return true;
		}

		if (this.head == this.tail || !this.head) {
			return false;
		}

		let current = this.head;
		for (; current.next;) {
			if (value == current.next.data) {
				if (current.next == this.tail) {
					this.tail = current;
				}

				current.next = current.next.next;

				return true;
			} else {
				current = current.next;
			}
		}

		return false;
	}

	clear() {
		this.head = null;
		this.tail = null;
	}

	contains(value) {
		if (!this.head) {
			return false;
		}

		let current = this.head;

		for (; current;) {
			if (current.data === value) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	count() {
		this.counter = 0;
		let current = this.head;

		if (!this.head) {
			return 0;
		}

		while (current) {
			this.counter++;
			current = current.next;
		}

		return this.counter;
	}

	next() {
		return this.nextElem.next();
	}

	getIterator() {
		return this[Symbol.iterator]();
	}

	toString() {
		let result = [];
		if (!this.head) {
			return '';
		}
		let current = this.head;
		for (; current;) {
			result.push(current.data);
			current = current.next;
		}
		return result.join(', ');
	}

	filter(callback) {
		if (!this.head) {
			return null;
		}
		let newList = Object.assign(Object.create(this), JSON.parse(JSON.stringify(this)));
		let current = newList.head;

		while (current !== null) {
			if (!callback(current.data)) {
				newList.remove(current.data);
			}

			current = current.next;
		}

		return newList;
	}

	*[Symbol.iterator]() {
		if (!this.head) {
			return;
		}

		let current = this.head;

		for (; current;) {
			yield current.data;
			current = current.next;
		}
	}

}

module.exports.LList = LList;
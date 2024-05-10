// Linked List Node
class ListNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

// Linked List Implementation
class LinkedList {
	constructor() {
		this.head = null;
	}

	add(value) {
		const newNode = new ListNode(value);
		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = newNode;
		}
	}

	remove(value) {
		if (!this.head) return false;
		if (this.head.data === value) {
			this.head = this.head.next;
			return true;
		}
		let current = this.head;
		while (current.next) {
			if (current.next.data === value) {
				current.next = current.next.next;
				return true;
			}
			current = current.next;
		}
		return false;
	}

	contains(value) {
		let current = this.head;
		while (current) {
			if (current.data === value) {
				return true;
			}
			current = current.next;
		}
		return false;
	}

	*[Symbol.iterator]() {
		let current = this.head;
		while (current) {
			yield current.data;
			current = current.next;
		}
	}

	clear() {
		this.head = null;
	}

	count() {
		let count = 0;
		let current = this.head;
		while (current) {
			count++;
			current = current.next;
		}
		return count;
	}

	log() {
		const values = [];
		let current = this.head;
		while (current) {
			values.push(current.data);
			current = current.next;
		}
		console.log(values.join(', '));
	}
}

function createLinkedList(arr) {
	const ll = new LinkedList();
	for (const value of arr) {
		ll.add(value);
	}
	return ll;
}

// Test cases
const ll = createLinkedList([100, 1, 2, 3, 100, 4, 5, 100]);
ll.log(); // "100, 1, 2, 3, 100, 4, 5, 100"
while (ll.remove(100));
ll.log(); // "1, 2, 3, 4, 5"
ll.add(10);
ll.log(); // "1, 2, 3, 4, 5, 10"
console.log(ll.contains(10)); // "true"
let sum = 0;
for (const n of ll) {
	sum += n;
}
console.log(sum); // "25"
ll.clear();
ll.log(); // ""

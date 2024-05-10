// Create guestList Set
const guestList = new Set(["Alice", "Bob", "Charlie", "David", "Eve"]);

// Check if someone is on the guest list
console.log("Is Alice invited?", guestList.has("Alice")); // true
console.log("Is Mallory invited?", guestList.has("Mallory")); // false

// Remove someone from the guest list
guestList.delete("Charlie");
console.log("Guest list after removing Charlie:", guestList);

// Create menu Map
const menu = new Map([
	["Pizza", 10],
	["Burger", 8],
	["Salad", 6],
	["Pasta", 12],
	["Soup", 5]
]);

// List all available dishes and their prices
console.log("Menu:");
menu.forEach((price, dish) => {
	console.log(`${dish}: $${price}`);
});

// Create bankVault WeakMap
const bankVault = new WeakMap();
const credentialsAlice = { username: "alice", password: "alice123" };
const credentialsBob = { username: "bob", password: "bob456" };
bankVault.set(credentialsAlice, "Contents of Alice's box");
bankVault.set(credentialsBob, "Contents of Bob's box");

// Access contents of a box with correct credentials
console.log("Alice's box contents:", bankVault.get(credentialsAlice));

// Create coinCollection WeakSet
const coinCollection = new WeakSet();
const coin1 = { country: "USA", year: 2020 };
const coin2 = { country: "UK", year: 2019 };
const coin3 = { country: "France", year: 2018 };
const coin4 = { country: "Germany", year: 2017 };
const coin5 = { country: "Japan", year: 2016 };
coinCollection.add(coin1);
coinCollection.add(coin2);
coinCollection.add(coin3);
coinCollection.add(coin4);
coinCollection.add(coin5);

// Check if a specific coin is in the collection
console.log("Is the coin from France, 2018 in the collection?", coinCollection.has(coin3)); // true
console.log("Is the coin from Italy, 2015 in the collection?", coinCollection.has({ country: "Italy", year: 2015 })); // false

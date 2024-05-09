// Function to make a copy of an object
function copyObj(obj) {
	// Initialize an empty object to store the copy
	let copy = {};
	// Iterate over the properties of the original object
	for (let key in obj) {
		// Check if the property is not inherited
		if (obj.hasOwnProperty(key)) {
			// Copy the property to the new object
			copy[key] = obj[key];
		}
	}
	// Return the copy
	return copy;
}

// Function to add words to the object's property
function addWords(obj, wrds) {
	// Split the new words string into an array of words
	let newWords = wrds.split(' ');
	// Split the object's property words into an array of words
	let wordsArray = obj.words.split(' ');
	// Concatenate the arrays and remove duplicates
	let combinedWords = [...new Set([...wordsArray, ...newWords])];
	// Join the words back into a string and assign it to the object's property
	obj.words = combinedWords.join(' ');
}

// Function to remove specified words from the object's property
function removeWords(obj, wrds) {
	// Split the words to be removed string into an array of words
	let removeWordsArray = wrds.split(' ');
	// Split the object's property words into an array of words
	let wordsArray = obj.words.split(' ');
	// Remove the specified words from the array
	let filteredWords = wordsArray.filter(word => !removeWordsArray.includes(word));
	// Join the remaining words back into a string and assign it to the object's property
	obj.words = filteredWords.join(' ');
}

// Function to change one or more words in the object's property
function changeWords(obj, oldWrds, newWrds) {
	// Split the old words string into an array of words
	let oldWordsArray = oldWrds.split(' ');
	// Split the new words string into an array of words
	let newWordsArray = newWrds.split(' ');
	// Split the object's property words into an array of words
	let wordsArray = obj.words.split(' ');
	// Replace old words with new words
	for (let i = 0; i < oldWordsArray.length; i++) {
		let index = wordsArray.indexOf(oldWordsArray[i]);
		if (index !== -1) {
			wordsArray.splice(index, 1, newWordsArray[i]);
		}
	}
	// Remove duplicates and join the words back into a string
	let uniqueWords = [...new Set(wordsArray)];
	obj.words = uniqueWords.join(' ');
}

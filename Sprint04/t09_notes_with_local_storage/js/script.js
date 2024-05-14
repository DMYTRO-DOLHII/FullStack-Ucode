document.addEventListener("DOMContentLoaded", function () {
	const noteTextarea = document.getElementById("note");
	const addNoteButton = document.getElementById("addNote");
	const clearStorageButton = document.getElementById("clearStorage");
	const notesDisplay = document.getElementById("notesDisplay");

	// Function to display notes from local storage
	function displayNotes() {
		notesDisplay.innerHTML = "";
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			const value = localStorage.getItem(key);
			const noteElement = document.createElement("div");
			noteElement.textContent = `${key}: ${value}`;
			notesDisplay.appendChild(noteElement);
		}
	}

	// Function to add note to local storage
	function addNote() {
		const note = noteTextarea.value.trim();
		if (note !== "") {
			const date = new Date().toLocaleString();
			localStorage.setItem(date, note);
			displayNotes();
			noteTextarea.value = "";
		} else {
			alert("Please enter a note first.");
		}
	}

	// Function to clear local storage
	function clearStorage() {
		const confirmClear = confirm("Are you sure you want to clear all notes?");
		if (confirmClear) {
			localStorage.clear();
			displayNotes();
		}
	}

	// Event listener for Add Note button
	addNoteButton.addEventListener("click", addNote);

	// Event listener for Clear Storage button
	clearStorageButton.addEventListener("click", clearStorage);

	// Display existing notes when the page loads
	displayNotes();
});

document.addEventListener('DOMContentLoaded', () => {
	const noteInput = document.getElementById('noteInput');
	const addToCookiesBtn = document.getElementById('addToCookies');
	const clearCookiesBtn = document.getElementById('clearCookies');
	const notesArchive = document.getElementById('notesArchive');

	addToCookiesBtn.addEventListener('click', () => {
		const note = noteInput.value.trim();
		if (note === '') {
			alert("It's empty. Try to input something in 'Text input'.");
			return;
		}
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 30); // Set expiry date to 30 days

		// Add cookie
		console.log(note);
		document.cookie = `note=${encodeURIComponent(note)}; expires=${currentDate.toUTCString()}`;

		displayNotes();
		noteInput.value = '';
	});

	clearCookiesBtn.addEventListener('click', () => {
		if (confirm('Are you sure?')) {
			document.cookie = 'note=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
			notesArchive.textContent = '[Empty]';
		}
	});

	function displayNotes() {
		const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)note\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		if (cookieValue === '') {
			notesArchive.textContent = '[Empty]';
		} else {
			notesArchive.textContent = decodeURIComponent(cookieValue);
		}
	}

	displayNotes();
});

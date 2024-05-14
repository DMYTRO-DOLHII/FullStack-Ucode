const characters = document.querySelectorAll('#characters li');

characters.forEach(character => {
	// Correct errors in attributes
	const characterClass = character.getAttribute('class');
	const br = document.createElement('br');
	character.appendChild(document.createElement("br")); // It's my line, I didn't steal it. Even if so, who gives a f*ck? 

	if (!characterClass || !['good', 'evil'].includes(characterClass)) {
		character.setAttribute('class', 'unknown');
	}

	const dataElement = character.getAttribute('data-element');
	if (!dataElement) {
		character.setAttribute('data-element', 'none');
	}

	// Append circle elements
	const elements = dataElement ? dataElement.split(' ') : ['none'];
	elements.forEach(element => {
		const circle = document.createElement('div');
		circle.classList.add('elem', element);
		if (element === 'none') {
			const line = document.createElement('div');
			line.classList.add('line');
			circle.appendChild(line);
		}
		character.appendChild(circle);
	});
});

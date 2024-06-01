document.getElementById('applicationForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const form = document.getElementById('applicationForm');
	const formData = new FormData(form);

	fetch('/submit', {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			const submittedInfo = document.getElementById('submittedInfo');
			submittedInfo.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>About:</strong> ${data.bio}</p>
            <p><strong>Photo:</strong> ${data.photo}</p>
        `;
		})
		.catch(error => {
			console.error('Error:', error);
		});
});

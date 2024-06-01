document.getElementById('quiz-form').addEventListener('submit', async function (e) {
	e.preventDefault();

	const formData = new FormData(this);
	const params = new URLSearchParams(formData);

	const response = await fetch('/submit', {
		method: 'POST',
		body: params
	});

	const result = await response.json();
	document.getElementById('result').textContent = result.result;
});

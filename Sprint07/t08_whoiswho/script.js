let csvData = [];

function uploadFile() {
	const fileInput = document.getElementById('fileInput');
	const file = fileInput.files[0];
	const reader = new FileReader();

	reader.onload = function (event) {
		const base64File = event.target.result;

		fetch('/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ file: base64File })
		})
			.then(response => response.json())
			.then(data => {
				csvData = data.data;
				displayTable(csvData);
				populateFilterOptions(csvData);
				document.getElementById('filterSection').style.display = 'block';
			});
	};

	reader.readAsDataURL(file);
}

function displayTable(data) {
	const table = document.getElementById('csvTable');
	table.innerHTML = '';

	if (data.length === 0) return;

	const columns = Object.keys(data[0]);

	const headerRow = table.insertRow();
	columns.forEach(column => {
		const cell = headerRow.insertCell();
		cell.innerHTML = `<b>${column}</b>`;
	});

	data.forEach(row => {
		const rowElement = table.insertRow();
		columns.forEach(column => {
			const cell = rowElement.insertCell();
			cell.textContent = row[column];
		});
	});
}

function populateFilterOptions(data) {
	const columns = Object.keys(data[0]);
	const columnSelect = document.getElementById('column');
	columnSelect.innerHTML = '';

	columns.forEach(column => {
		const option = document.createElement('option');
		option.value = column;
		option.textContent = column;
		columnSelect.appendChild(option);
	});
}

function applyFilter() {
	const column = document.getElementById('column').value;
	const value = document.getElementById('filterValue').value;

	fetch(`/filter?column=${column}&value=${value}`)
		.then(response => response.json())
		.then(data => {
			displayTable(data.data);
		});
}
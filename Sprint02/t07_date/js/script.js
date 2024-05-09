// Function to format a date into a particular way
function getFormattedDate(dateObject) {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	let day = dateObject.getDate();
	let month = dateObject.getMonth();
	let year = dateObject.getFullYear();
	let hours = dateObject.getHours();
	let minutes = dateObject.getMinutes();
	let seconds = dateObject.getSeconds();

	// Add leading zeros if necessary
	day = day < 10 ? '0' + day : day;
	month = month < 9 ? '0' + (month + 1) : (month + 1);
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	const formattedDate = `${day}.${month}.${year} ${hours}:${minutes} ${daysOfWeek[dateObject.getDay()]}`;
	return formattedDate;
}

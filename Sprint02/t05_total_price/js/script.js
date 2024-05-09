// Define a function to calculate the total order sum
function total(addCount, addPrice, currentTotal = 0) {
	if (currentTotal === undefined || Number.isNaN(currentTotal)) currentTotal = 0;

	return currentTotal + (addCount * addPrice);
}

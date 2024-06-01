// normal.js
function calculateTime() {
	const startDate = new Date('1939-01-01');
	const currentDate = new Date();

	const diffTime = Math.abs(currentDate - startDate);
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffYears = Math.floor(diffDays / 365);
	const diffMonths = Math.floor((diffDays % 365) / 30);
	const remainingDays = (diffDays % 365) % 30;

	return {
		years: diffYears,
		months: diffMonths,
		days: remainingDays
	};
}

module.exports = { calculateTime };

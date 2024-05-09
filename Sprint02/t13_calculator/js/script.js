function Calculator() {
	let result = 0;

	function alertMessage() {
		setTimeout(function () {
			alert("Current result: " + result);
		}, 5000);
	}

	return {
		init(num) {
			result = num;
			return this;
		},
		add(num) {
			result += num;
			return this;
		},
		sub(num) {
			result -= num;
			return this;
		},
		mul(num) {
			result *= num;
			return this;
		},
		div(num) {
			result /= num;
			return this;
		},
		alert() {
			alertMessage();
			return this;
		},
		get result() {
			return result;
		}
	};
}

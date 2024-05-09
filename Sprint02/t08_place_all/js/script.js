// Function to sort and place even and odd numbers in an array
function sortEvenOdd(arr) {
	let left = 0;
	let right = arr.length - 1;

	while (left < right) {
		// Move left pointer until it points to an odd number
		while (arr[left] % 2 === 0 && left < right) {
			left++;
		}
		// Move right pointer until it points to an even number
		while (arr[right] % 2 === 1 && left < right) {
			right--;
		}
		// Swap the elements if left points to an odd number and right points to an even number
		if (left < right) {
			const temp = arr[left];
			arr[left] = arr[right];
			arr[right] = temp;
			left++;
			right--;
		}
	}
}

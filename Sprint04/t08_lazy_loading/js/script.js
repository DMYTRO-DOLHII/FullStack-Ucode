document.addEventListener("DOMContentLoaded", function () {
	let collection;
	let timeout;
	let loading = document.querySelectorAll("img");
	let photos = document.getElementsByTagName('img');
	let num = document.getElementById('img-num');
	let img_count = document.getElementById('img-count');
	let check = true;
	let label;

	loading.forEach(function (img) {
		img.classList.add('loading');
	});

	img_count.innerHTML = loading.length

	function kill_timeout() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function () {
			let scrollTop = window.pageYOffset;
			loading.forEach(function (img) {
				if ((window.innerHeight + scrollTop) >= img.offsetTop) {
					num.innerHTML = '';
					collection = document.getElementsByClassName('loading');
					img.classList.remove('loading');
					img.src = img.dataset.src;
					num.insertAdjacentHTML('afterbegin', `${photos.length - collection.length}`);
					if (collection.length == 0 && check) {
						check = false;
						label = document.getElementsByTagName('label')[0];
						label.classList.add('finish');
					}
				}
			});
		}, 250);
	}

	document.addEventListener("scroll", kill_timeout);
});
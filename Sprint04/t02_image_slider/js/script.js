const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
let currentIndex = 0;
const sliderImage = document.getElementById("slider-image");

function showImage(index) {
	sliderImage.src = `assets/images/${images[index]}`;
}

function nextImage() {
	currentIndex = (currentIndex + 1) % images.length;
	showImage(currentIndex);
}

function prevImage() {
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	showImage(currentIndex);
}

document.getElementById("next-btn").addEventListener("click", nextImage);
document.getElementById("prev-btn").addEventListener("click", prevImage);

// Automatic sliding every 3 seconds
setInterval(nextImage, 3000);

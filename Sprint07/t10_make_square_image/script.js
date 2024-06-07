const input = document.querySelector("input");
document.querySelector("#submit").addEventListener("click", function (element) {
	element.preventDefault();
	if (input.value !== undefined) {
		fetch("/upload/?url=" + input.value)
			.then((res) => res.json())
			.then(function (data) {
				document.querySelector("#imgFirst").innerHTML =
					`<img src="public/${data.img[0]}">
                               <img src="public/${data.img[1]}">
                               <img src="public/${data.img[2]}">
                               <img src="public/${data.img[3]}">`;
			});
	}
});
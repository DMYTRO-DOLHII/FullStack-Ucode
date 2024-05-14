function transformation() {
	var heroName = document.getElementById("hero");
	var button = document.getElementById("btn");

	if (heroName.innerText === "Bruce Banner") {
		heroName.innerText = "Hulk";
		heroName.style.fontSize = "130px";
		heroName.style.letterSpacing = "6px";
		document.getElementById("lab").style.background = "#70964b";
	} else {
		heroName.innerText = "Bruce Banner";
		heroName.style.fontSize = "60px";
		heroName.style.letterSpacing = "2px";
		document.getElementById("lab").style.background = "#ffb300";
	}
}

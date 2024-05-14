const films = [
	{
		id: 1,
		title: "Iron Man",
		poster: "assets/images/iron_man_poster.jpg",
		productionDate: "May 2, 2008",
		mainActors: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"],
		description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
	},
	{
		id: 2,
		title: "Avengers: Endgame",
		poster: "assets/images/avengers_endgame_poster.jpg",
		productionDate: "April 26, 2019",
		mainActors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
		description: "The remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos."
	},
	{
		id: 3,
		title: "Black Panther",
		poster: "assets/images/black_panther_poster.jpg",
		productionDate: "February 16, 2018",
		mainActors: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
		description: "After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk."
	}
];

let filmInfoBlock = document.getElementById("film-details");
filmInfoBlock.style.display = "none";

const filmTitles = document.getElementById("film-titles");
const filmTitle = document.getElementById("film-title");
const filmPoster = document.getElementById("film-poster");
const productionDate = document.getElementById("production-date");
const mainActors = document.getElementById("main-actors");
const filmDescription = document.getElementById("film-description");

// Populate film titles
films.forEach(film => {
	const li = document.createElement("li");
	li.textContent = film.title;
	li.dataset.id = film.id;
	filmTitles.appendChild(li);
});

// Event listener for clicking film titles
filmTitles.addEventListener("click", event => {
	filmInfoBlock.style.display = "block";
	const selectedFilmId = parseInt(event.target.dataset.id);
	const selectedFilm = films.find(film => film.id === selectedFilmId);

	if (selectedFilm) {
		filmTitle.textContent = selectedFilm.title;
		filmPoster.src = selectedFilm.poster;
		productionDate.textContent = selectedFilm.productionDate;
		mainActors.textContent = selectedFilm.mainActors.join(", ");
		filmDescription.textContent = selectedFilm.description;
	}
});

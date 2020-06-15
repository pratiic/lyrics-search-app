import { elements } from "./elements.js";
import { searchSongs, fetchSongLyrics } from "./fetchSongLyrics.js";

elements.form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (elements.searchBar.value !== "") {
		searchSongs(elements.searchBar.value);
		elements.searchBar.value = "";
	}
});

elements.songsList.addEventListener("click", (event) => {
	if (event.target.classList.contains("get-lyrics-button")) {
		fetchSongLyrics(Number(event.target.parentNode.id));
	}
});

import { elements } from "./elements.js";

let url = "https://api.lyrics.ovh";

let fetchedSongs = [];

export let searchSongs = function (searchTerm) {
	showSongsList();

	clearSongsList();

	clearLyrics();

	elements.resultsTitle.innerText = "search results";

	fetch(`${url}/suggest/${searchTerm}`)
		.then((response) => response.json())
		.then((data) => {
			data.data.forEach((song) => {
				fetchedSongs.push({
					id: song.id,
					title: song.title,
					artist: song.artist.name,
				});

				renderSongsList(song);
			});
		});
};

let renderSongsList = function (song) {
	elements.songsList.innerHTML += `
        <li class="song capitalize" id = "${song.id}">
            <p class="song-info">
                <span class="artist">${song.artist.name}</span>
                <span>-</span>
                <span class="title">${song.title}</span>
            </p>
            <button class="button captalize get-lyrics-button">
                get lyrics
            </button>
        </li>
    `;
};

export let fetchSongLyrics = function (id) {
	fetchedSongs.forEach((song) => {
		if (song.id === id) {
			let { artist, title } = song;
			fetch(`${url}/v1/${artist}/${title}`)
				.then((response) => response.json())
				.then((data) => {
					clearSongsList();

					hideSongsList();

					let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

					renderLyrics(artist, title, lyrics);
				})
				.catch((error) => console.log(error));
		}
	});
};

let renderLyrics = function (artist, title, lyrics) {
	elements.resultsTitle.innerHTML = `
        <h1 class="lyrics-title capitalize">
            <span class="artist">${artist}</span>
            <span>-</span>
            <span class="title">${title}</span>
        </h1>
    `;

	elements.lyricsContainer.innerHTML += `
        <p class="lyrics">
            ${lyrics}
        </p>
	`;

	fetchedSongs = [];
};

let clearSongsList = function () {
	elements.songsList.innerHTML = "";
};

let clearLyrics = function () {
	elements.lyricsContainer.innerHTML = "";
};

let hideSongsList = function () {
	elements.songsList.style.display = "none";
};

let showSongsList = function () {
	elements.songsList.style.display = "block";
};

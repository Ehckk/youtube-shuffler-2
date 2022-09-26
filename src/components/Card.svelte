<script lang="ts">
    import { NotifType } from "@/interfaces/NotifType";
    import { notifs } from "@/store";
	import { sineOut } from "svelte/easing";
	import { fly } from "svelte/transition";
    import type { Playlist } from "@/interfaces/Playlist";

	export let playlistData: Playlist
	notifs.push(NotifType.Green, `Playlist Loaded`, `Fetching playlist items...`)
</script>

<div class="card" in:fly="{{ y: 50, duration: 500, easing: sineOut }}">
	<div class="card__text">
		<h1 class="card__title">{playlistData.snippet.title}</h1>
		<p class="card__author">{playlistData.snippet.channelTitle}</p>
		<!-- TODO more playlist data here like videos, etc -->
	</div>
	<img class="card__img" src={playlistData.snippet.thumbnails.default?.url} alt="fail ;-;">
</div>

<style>
.card {
	height: min(10rem, 25vw);
	margin: min(1rem, 2.5vw);
	border-radius: min(1rem, 2.5vw);
	padding: min(1rem, 2.5vw);
	background-color: var(--blue-700);
	display: flex;
	box-shadow: inset 0 1px 0 var(--blue-600), 0px 1px 3px hsla(0, 0%, 0%, .5);
}
.card__title {
	font-weight: bold;
	font-size: min(2.5rem, 6.25vw);
}
.card__title {
	grid-area: title;
	color: var(--grey-200);
	padding-right: min(2rem, 5vw);
}
.card__author {
	color: var(--blue-200);
	font-size: min(1.5rem, 3.75vw);
	font-weight: normal;
	grid-area: author;
}
.card__img {
	width: min(8rem, 20vw);
}
</style>
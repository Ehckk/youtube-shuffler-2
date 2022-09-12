<script lang="ts">
import Player from '../components/Player.svelte';
import { playlist, playlistId } from '../store';
import { getPlaylist } from '../utils/getPlaylist';
import SearchBar from '../components/SearchBar.svelte';
import { formatErrorMessage } from '../utils/formatErrorMessage';
import '../app.css'

let query: string | null = null
let fetch: Promise<void> | null

const handleSearch = async (e: CustomEvent<{ query: string }>) => {
	$playlist = []
	$playlistId = null
	query = e.detail.query ?? null
	fetch = getPlaylist(query, null)	
}
// TODO: since the promise is tied to query param changes, load a menu if the playlist is found to be private 
</script>

<!-- TODO 🐷 <svelte:body /> -->
<nav class="navbar">
	<h1 class="navbar__title">Youtube Playlist Shuffler</h1>
</nav>
<SearchBar on:search={handleSearch} />
<div class="container">
{#if query !== null}
	{#await fetch}
		<span class="container__spinner"></span> 
	{:then}
		<Player/>
	{:catch error}
		<div class="container__wrapper">
		{#each formatErrorMessage(error) as message}  
			<p class="container__error">{message}</p>
		{/each}
		</div>
	{/await}
{:else}
	<p class="container__prompt">Search for a playlist using the id</p>
{/if}
</div>
<style>
.navbar {
	height: min(11.25vw, 3rem);
	width: 100vw;
	background-color: var(--blue-5);
	display: flex;
	justify-content: center;
	z-index: 1;
}
.navbar__title, .container__prompt {
	color: var(--blue-85);
}
.navbar__title {
	font-size: min(7.5vw, 2rem);
	margin-top: min(1.875vw, .5rem);
	margin-bottom: min(1.875vw, .5rem);
	display: flex;
	align-items: center;
}
.container {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	background-image: linear-gradient(180deg, var(--blue-10) 0, var(--blue-20) 75%);
}
.container__wrapper {
	display: flex;
	flex-direction: column;
}
.container__wrapper, .container__prompt {
	margin-top: min(3.75vw, 1rem);
}
.container__prompt, .container__error {
	text-align: center;
	font-size: min(3.75vw, 1rem);
}
.container__error {
	color: var(--red);
	font-weight: bold;
}
.container__spinner {
	height: min(30vw, 8rem);
	width: min(30vw, 8rem);
	margin-top: min(3.75vw, 1rem);
	border-width: min(4.688vw, 1.25rem);
	border-radius: 50%;
	border-style: solid;
	border-top-color: var(--blue-45);
	border-left-color: var(--blue-45);
	border-bottom-color: var(--blue-55);
	border-right-color: var(--blue-55);
	animation-name: Spin;
	animation-duration: 1s;
	animation-timing-function: ease-in-out;
	animation-iteration-count: infinite;
}
/* TODO: options? */
	/* .options {
		height: 2rem;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		cursor: default;
		pointer-events: none;
	}
	.options.itemsLoaded {
		cursor: pointer;
		pointer-events: all;
	}

	span.triangle {
		height: .75rem;
		width: .75rem;
		margin-left: .5rem;
		border-width: .75rem .375rem 0em .375rem;
		border-style: solid;
		border-color: var(--blue-95) transparent transparent transparent;
		transition: var(--transition) transform;
	}
	span.triangle.openOptions {
		transform: rotateZ(-180deg);
	}
	h4, span.triangle {
		opacity: 0;
		pointer-events: none;
	}
	h4.itemsLoaded, span.triangle.itemsLoaded {
		opacity: 100;
		pointer-events: all;
	}
	.menu {
		height: fit-content;
		height: 6rem;
		background-color: var(--blue-15);
		width: 100%;
		z-index: 10;
		position: absolute;
		transition-property: transform; 
		transition-duration: var(--transition); 
		transition-timing-function: linear;
		transform: translateY(0rem);
		pointer-events: none;
	}
	.menu.openOptions {
		transform: translateY(6rem);
		pointer-events: all;
	} */
	@keyframes Spin {
		0% {
			transform: rotateZ(0deg);
		}

		100% {
			transform: rotateZ(360deg);	
		}
	}
</style>
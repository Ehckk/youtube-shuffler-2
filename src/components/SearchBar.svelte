<script lang="ts">
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher()
let searchBar: HTMLInputElement

const onSubmit = () => {
	dispatch('search', { query: searchBar.value })
}

const onKeyDown = (e: KeyboardEvent) => {
	if (e.code === 'Enter') {
		e.preventDefault()
		onSubmit()
	}
}
</script>

<style>
.searchBar {
	width: 100vw;
	background-image: linear-gradient(180deg, var(--blue-5) 25%, var(--blue-10) 75%);
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	z-index: 1;
}
.searchBar__label {
	font-size: min(6vw, 1.625rem);
	color: var(--blue-85);
	margin: min(1.875vw, .5rem);
}
.searchBar__input {
	min-height: min(5.625vw, 1.5rem);
	width: 77.5%;
	border-radius: min(1.875vw, .5rem);
	border-width: .125rem;
	padding: min(1.406vw, .375rem);
	font-size: min(2.813vw, .75rem);
	background-color: var(--blue-85);
	border-style: solid;
	border-color: var(--blue-10);
	color: var(--blue-15);
}
.searchBar__input::placeholder {
	user-select: none;
	color: var(--blue-15);
	opacity: .6;
}
.searchBar__input:focus {
	border-color: var(--blue-55);
}
.searchBar__button {
	height: min(11.25vw, 3rem);
	width: min(30vw, 8rem);
	margin: min(1.875vw, .5rem);
	border-radius: min(5.625vw, 1.5rem);
	border-width: 0;
	background-color: var(--blue-45);
	color: var(--blue-95);
	font-size: min(5.625vw, 1.5rem);
}

.searchBar__button:hover {
	background-color: var(--blue-50);
}

.searchBar__button:active {
	transform: translateY(.125rem);
}
@media screen and (min-width: 640px) {
	.searchBar__input {
		width: 31rem;
	}
} 
@media screen and (min-width: 840px) {
	.searchBar {
		flex-direction: row;
		padding: .5rem;
	}
} 
</style>

<form class="searchBar" on:submit|preventDefault={onSubmit}>
	<h2 class="searchBar__label">Playlist Id: </h2>
	<input class="searchBar__input" type="text" on:keydown={onKeyDown} bind:this={searchBar} placeholder="Ex: PLLyyQlIzBmeHf7yTLeM0ahRyfoKZXHDLy">
	<button class="searchBar__button" type="submit">Search</button>
</form>
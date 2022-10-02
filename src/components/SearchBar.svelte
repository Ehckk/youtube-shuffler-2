<script lang="ts">
	import { sineOut } from 'svelte/easing'
	import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { searching, showSettings, shuffling } from '@/store';

	export let player: {}
	let value: string = '';
	let input: HTMLInputElement;

	$: disabled = $searching || $shuffling
	
	const dispatch = createEventDispatcher()
	const handleSearch = () => {
		if (value.length === 0) return
		player = {}
		window.scrollTo({ top: input.getBoundingClientRect().top, behavior: 'smooth' })
		dispatch('search', { key: value })
	}
</script>

<div class="searchbar" in:fly="{{ delay: 1000, y: 100, duration: 1000, easing: sineOut }}">
	<h1 class="searchbar__header">Search for a Playlist</h1>
	<input class="searchbar__input" 
		bind:value={value} bind:this={input} type="text" class:disabled on:keydown={(e => e.code === 'Enter' ? handleSearch() : {})} placeholder="Ex: https://www.youtube.com/playlist?list=PLLyyQlIzBmeGS9y8pdkePon6zgYkquZ8D"/>
	{#if value.length > 0}
		<button class="searchbar__button" class:disabled 
			on:click="{handleSearch}" transition:fly="{{ y: 50, duration: 200, easing: sineOut }}">Search</button>
	{/if}
</div>

<style>
	.searchbar {
		display: grid; 
		grid-template-rows: min(8rem, 20vw) min(5.5rem, 13.75vw) min(4rem, 10vw); 
		align-items: center;
		justify-items: center;
	}
	.searchbar__header {
		margin-top: min(3rem, 7.5vw);
		font-size: min(4rem, 10vw);
		font-weight: bold; 
		color: var(--grey-200);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.searchbar__input {
		appearance: none;
		height: min(2.5rem, 6.25vw);
		width: min(40rem, 80vw);
		margin: min(1rem, 2.5vw);
		border-radius: min(.5rem, 1.25vw);
		padding: .5rem;
		background-color: var(--grey-200);
		color: var(--blue-800);
		font-size: min(1rem, 2.5vw);
		font-weight: 500;
		outline: none;
		border: none;
		box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, .25), inset 0 -2px 0 hsla(0, 0%, 100%, .2);
	}
	.searchbar__input::placeholder {
		color: var(--grey-800);
		font-size: min(1rem, 2.5vw);
		user-select: none;
	}
	.searchbar__button {
		height: min(4rem, 10vw);
		width: min(12rem, 30vw);
		border-style: none;
		border-width: 0;
		border-radius: min(.5rem, 1.25vw);
		background-color: var(--blue-500);
		color: var(--grey-200);
		font-size: min(2.5rem, 6.25vw);
		font-weight: 700;
		user-select: none;	
		box-shadow: inset 0 1px 0 var(--blue-400), 0 1px 3px hsla(0, 0%, 0%, .2);
		transition-property: transform;
		transition-duration: .125s; 
		transition-timing-function: ease-in-out;
	}
	.searchbar__button:hover {
		transition-property: transform;
		transform: scale(1.125);
	}
	.searchbar__button:active, .searchbar__button.disabled {
		transform: translateY(min(.25rem, .625vw));
		background-color: var(--blue-600);
		box-shadow: none;
	}
	.searchbar__input.disabled, .searchbar__button.disabled {
		pointer-events: none;
	}
</style>
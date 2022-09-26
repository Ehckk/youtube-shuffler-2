<script lang="ts">
	import Item from './Item.svelte';
	import { playlist, queue } from '@/store'
    import { sineOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let play: () => Promise<void>
	
	// $: scrollHeightPerItem = queue ? (queue.scrollHeight / $playlist.length) : 0
	$: items = $playlist.map(i => i)

	const scroll = (node: HTMLElement) => {
		window.scrollTo({ top: node.getBoundingClientRect().bottom , behavior: 'smooth' })
	}
</script>
<!-- TODO put transition on  -->
<div class="queue" bind:this={$queue} use:scroll in:fly="{{ y: 50, duration: 500, easing: sineOut }}">
	{#each items as item, index (item.id)}
		<div class="itemWrapper" animate:flip={{ duration: 200, easing: sineOut }}>
			<Item {item} {index} on:play={() => play()}/>
		</div>	
	{/each}
</div>

<style>
/* TODO: fix styles for mobile devices */
	.queue {
		grid-area: queue;
		width: calc(100% - min(2rem, 5vw));
		height: calc(100vh - min(7rem, 17.5vw) - min(1rem, 2.5vw));
		border-radius: min(2.5vw, 1rem);
		overflow-y: auto;
		background-color: var(--grey-900);
	}
	.queue::-webkit-scrollbar {
		width: min(1rem, 2.5vw);
	}
	.queue::-webkit-scrollbar-track {
		background-image: linear-gradient(var(--blue-800) 20%, var(--blue-700) 80%);
		border-radius: min(.5rem, 1.25vw);
	}
	.queue::-webkit-scrollbar-thumb {
		background-color: var(--blue-500);
		border-radius: min(.5rem, 1.25vw);
	}
	@media screen and (max-width: 1100px) {
	}
</style>
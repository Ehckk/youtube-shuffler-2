<script lang="ts">
    import type { PlaylistItem } from "@/interfaces/PlaylistItem";
    import { current } from "@/store";
    import { sineOut } from "svelte/easing";
    import { fly } from "svelte/transition";
	
	export let item: PlaylistItem
	let titleWidth: number = 0;
	let boxWidth: number = 0;
	
	$: scrollOverFlow = boxWidth - titleWidth 
	$: scrollOffset = scrollOverFlow < 0 ? scrollOverFlow : 0;
</script>

{#if item}
<a class="marquee__window" in:fly="{{ y: 50, duration: 500, easing: sineOut }}" style={`--scroll-offset: ${scrollOffset}px;`} bind:clientWidth={boxWidth} href={`https://www.youtube.com/watch?v=${item.contentDetails.videoId}`} target="_blank">
	<h3 class="marquee__text" bind:clientWidth={titleWidth}>{item.snippet.title}</h3>
</a>
{/if}

<style>
.marquee__window {
	width: 80%;
	overflow-x: hidden;
	display: block;
	text-align: center;
}

.marquee__text {
	height: 100%;
	display: inline-block;
	color: var(--grey-200);
	font-size: min(3.75vw, 1.5rem);
	font-weight: normal;
	white-space: nowrap;
	transition-property: height;
	transition-duration: .125s; 
	transition-timing-function: ease-in-out;
	animation-name: SlideText; 
	animation-duration: 4s; /* TODO Set dynamically based on the magnitude of the text overflow */
	animation-timing-function: ease-in-out; 
	animation-iteration-count: infinite;
}

.marquee__window:active > .marquee__text {
	color: var(--blue-200);
}
.marquee__window:hover > .marquee__text {
	color: var(--blue-100);
}
@keyframes SlideText {
	to {
		transform: translateX(var(--scroll-offset));
	}
}
</style>
<script lang="ts">
    import type { PlaylistItem } from '@/interfaces/PlaylistItem';
	import { playlist, currentPos, current, searching, shuffling, queue } from '@/store';
	import { getThumbnail } from '@/utils/getThumbnail';
    import { createEventDispatcher } from 'svelte';

	export let item: PlaylistItem
	export let index: number

	const dispatch = createEventDispatcher()
	let thisItem: HTMLDivElement

	$: playing = $current === item
	$: thumbnail = getThumbnail(item)
	$: disabled = $searching || $shuffling 

	const moveUp = () => {
		if (playing || index === 0) return
		if (index === $currentPos + 1) {
			playlist.add(playlist.remove(item), --index)
			$currentPos++
			return 
		}
		playlist.add(playlist.remove(item), --index)
	}	
	const playNow = () => {
		console.log(thisItem.offsetTop); 
		// TODO leave a little space (1 list item tall above the scroll)
		// You owuld need a responsive variable for this mundane feature so 🐟
		$queue.scrollTo({ top: thisItem.offsetTop - 144, behavior: 'smooth' })
		$currentPos = index
		dispatch('play')
	}
	const moveDown = () => {
		if (playing || index === $playlist.length - 1) return
		if (index === $currentPos - 1) {
			playlist.add(playlist.remove(item), ++index)
			$currentPos--
			return 
		}
		playlist.add(playlist.remove(item), ++index)
	}
</script>
<!-- TODO mobile layout -->
<div class="item" class:playing bind:this={thisItem}>
	<div class="handle">
		<button class="handle__button up" class:playing class:disabled on:click={() => moveUp()}></button>
		<button class="handle__button now" class:playing class:disabled on:click={async () => playNow()}></button>
		<button class="handle__button down" class:playing class:disabled on:click={() => moveDown()}></button>
	</div>
	<img src={thumbnail} alt="fail ;-;">
	<div class="info">
		<p class="title" class:playing>{item.snippet.title}</p>
		<p class="author" class:playing>{item.snippet.videoOwnerChannelTitle}</p>
	</div>	
</div>


<style>
.item {
	border-radius: min(1.875vw, .75rem);
	margin-top: min(2.5vw, 1rem);
	margin-bottom: min(2.5vw, 1rem);
	margin-right: min(2.5vw, 1rem);
	margin-left: min(2.5vw, 1rem);
	padding: min(1.25vw, .5rem);
	background-color: var(--blue-800);
	display: grid;
	grid-template-areas: "handle image info";
	grid-template-columns: min(10vw, 4rem) min(12rem, 30vw) 1fr;
	grid-template-rows: 1fr;
	box-shadow: inset 0 1px 0 var(--blue-700), 0px 2px 6px hsla(0, 0%, 0%, .5);
}
.item.playing {
	background-color: var(--blue-300);
	box-shadow: inset 0 1px 0 var(--blue-200), 0px 1px 3px hsla(0, 0%, 0%, .5);
}
.handle {
	grid-area: handle;
	min-width: min(10vw, 2rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.handle__button {
	transition-duration: .125s;
	transition-timing-function: ease-in-out;
	transition-property: transform;
} 
.handle__button.up, .handle__button.down {
	height: min(2.5vw, 1rem);
	border-width: 0 min(2.5vw, 1rem) min(5vw, 2rem) min(2.5vw, 1rem);
	border-color: transparent transparent var(--blue-500) transparent;
	border-style: solid;
	background-color: transparent;
	cursor: pointer;
	outline: none;
}
.handle__button.now {
	height: min(5vw, 2rem);
	width: min(5vw, 2rem);
	margin-top: min(1.25vw, .5rem);
	margin-bottom: min(1.25vw, .5rem);
	border-radius: 50%;
	border: none;	
	background-color: var(--blue-500);
	cursor: pointer;
	outline: none;
}
.handle__button.down { 
	transform: rotateZ(180deg);
}
.handle__button.now:hover, .handle__button.up:hover {
	transform: scale(1.125);
}
.handle__button.down:hover {
	transform: scale(1.125) rotateZ(180deg);
}
.handle__button.now:active, .handle__button.now.disabled {
	transform: translateY(min(.5vw, .125rem));	
	background-color: var(--blue-600);
} 
.handle__button.up:active, .handle__button.up.disabled {
	transform: translateY(min(.5vw, .125rem));	
	border-color: transparent transparent var(--blue-600) transparent;
} 
.handle__button.down:active, .handle__button.down.disabled {
	transform: translateY(min(.5vw, .125rem)) rotateZ(180deg);	
	border-color: transparent transparent var(--blue-600) transparent;
} 
.handle__button.now.playing, .handle__button.now.disabled, .handle__button.up.playing, .handle__button.up.disabled, .handle__button.down.playing, .handle__button.down.disabled {
	pointer-events: none;
}
.handle__button.now.playing {
	background-color: var(--blue-700);
}
.handle__button.up.playing, .handle__button.down.playing {
	border-color: transparent transparent var(--blue-700) transparent;
}
img {
	grid-area: image;
	height: min(22.5vw, 9rem);
	width: min(30vw, 12rem);
	color: black;
	font-size: min(3.125vw, 1.25rem);
	text-align: center;
}
.info {
	grid-area: info;
	padding-left: min(1.25vw, .5rem);
	display: grid;
	grid-template-areas: "title" "author";
	grid-template-rows: 1fr min(6vw, 1.5rem);
	grid-template-columns: 1fr;
}
p.title {
	color: var(--grey-300);
	padding-top: min(.625vw, .25rem);
	padding-left: min(.625vw, .25rem);
	font-weight: normal;
	font-size: min(3vw, 1.2rem);
	line-height: 1.25;
}
p.author {
	color: var(--blue-400);
	padding-left: min(.625vw, .25rem);
	padding-bottom: min(1.25vw, .5rem);
	font-weight: normal;
	font-size: min(2.5vw, 1rem);
}
p.title.playing {
	color: var(--blue-700);
	font-weight: bold;
}
p.author.playing {
	color: var(--blue-600);
	font-weight: bold;
}
@media screen and (max-width: 720px) {
	.item {
		grid-template-areas: "image info" "handle info";
		grid-template-columns: min(9rem, 22.5vw) 1fr;
		grid-template-columns: min(12rem, 30vw) 1fr;
		grid-template-rows: 1fr min(4rem, 10vw);
	}

	.handle {
		flex-direction: row;
	}
}
@keyframes SlideText {
	0% {
		transform: translateX(0);
	}

	20% {
		transform: translateX(0);
	}

	80% {
		transform: translateX(var(--scroll-offset));
	}

	100% {
		transform: translateX(var(--scroll-offset));	
	}
}
</style>
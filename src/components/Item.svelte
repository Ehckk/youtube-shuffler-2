<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import type { QueueItem } from '../interfaces';
	import { current } from '../store';
	import { getThumbnail } from '../utils/getThumbnail';

	export let item: QueueItem
	const dispatch = createEventDispatcher();
	$: playing = $current === item
	$: thumbnail = getThumbnail(item.item)

</script>
<!-- Position issues lol -->
<!-- TODO mobile layout -->
<div class="itemWrapper" class:playing>
	<div class="handle">
		<button class="up" class:playing on:click={() => dispatch('moveup')}></button>
		<button class="now" class:playing on:click={() => dispatch('playnow')}></button>
		<button class="down" class:playing on:click={() => dispatch('movedown')}></button>
	</div>
	<img src={thumbnail} alt="fail ;-;">
	<div class="info">
		<p class="title" class:playing>{item.item.snippet.title}</p>
		<p class="author" class:playing>{item.item.snippet.videoOwnerChannelTitle}</p>
	</div>	
</div>

<style>
p.title, p.author {
	color: var(--blue-55);
}
p.author {
	padding-top: .25rem;
	padding-left: .25rem;
}
p.title {
	max-width: 100%;
	width: fit-content;
}
.itemWrapper {
	height: 6.75rem;
	width: 100%;
	background-image: linear-gradient(var(--blue-5) 25%, var(--blue-10) 80%);
	border-width: min(.469vw, .125rem);
	border-style: solid;
	border-color: var(--blue-15);
	display: grid;
	grid-template-areas: "handle image info";
	grid-template-columns: min(11.25vw, 3rem) 9rem 1fr;
	grid-template-rows: 1fr;
}
.itemWrapper.playing {
	background-image: linear-gradient(var(--blue-85) 25%, var(--blue-80) 80%);
	border-color: var(--blue-5);
}
p.playing {
	color: var(--blue-45);
}
.handle {
	height: 100%;
	min-width: min(11.25vw, 3rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
button.up, button.down {
	height: min(2.813vw, .75rem);
	border-width: 0 min(2.813vw, .75rem) min(5.625vw, 1.5rem) min(2.813vw, .75rem);
	border-color: transparent transparent var(--blue-50) transparent;
	border-style: solid;
	background-color: transparent;
}
button.now {
	height: min(5.625vw, 1.5rem);
	width: min(5.625vw, 1.5rem);
	border-radius: 50%;
	border: none;	
	background-color: var(--blue-50);
}
button.down { 
	transform: rotateZ(180deg);
}
button.up, button.down, button.now {
	cursor: pointer;
	outline: none;
}
button.now:hover {
	background-color: var(--blue-55);
}
button.up:hover, button.down:hover {
	border-color: transparent transparent var(--blue-55) transparent;
}
button.up:active, button.now:active {
	transform: translateY(min(.469vw, .125rem));
}
button.down:active {
	transform: translateY(min(.469vw, .125rem)) rotateZ(180deg);	
} 
button.now.playing, button.up.playing, button.down.playing {
	pointer-events: none;
}
button.now.playing {
	background-color: var(--blue-45);
}
button.up.playing, button.down.playing {
	border-color: transparent transparent var(--blue-45) transparent;
}
img {
	height: min(24.844vw, 6.625rem);
	width: min(33.75vw, 9rem);
	color: black;
	font-size: min(4.688vw, 1.25rem);
	text-align: center;
}
.info {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding:  min(1.875vw, .5rem);
}
p.title {
	font-size: min(3.75vw, 1rem);
	line-height: min(3.75vw, 1rem);
}
p.author {
	font-size: min(2.813vw, .75rem);
	line-height: min(2.813vw, .75rem);
}
@media screen and (max-width: 640px) {
	.itemWrapper {
		height: min(36.563vw, 9.75rem);
		grid-template-areas: "image info" "handle info";
		grid-template-columns: min(33.75vw, 9rem) 1fr;
		grid-template-rows: min(25.313vw, 6.75rem) min(11.25vw, 3rem);
	}
	img {
		grid-area: image;
	}
	.handle {
		grid-area: handle;
		height: min(11.25vw, 3rem);
		flex-direction: row;
	}
	.info {
		grid-area: info;
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
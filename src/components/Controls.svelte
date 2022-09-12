<script lang="ts">
import type { QueueItem } from "../interfaces";
import { onMount, afterUpdate, createEventDispatcher,} from "svelte";
import { current, playlist, isLoop, isPaused } from "../store";
import Marquee from "./Marquee.svelte";
	
const dispatch = createEventDispatcher()

const handleNext = async () => {
	$current.position === $playlist.length - 1 ? {} : $current = $playlist[$current.position + 1]
	dispatch('play')
}
const handlePrev = async () => {
	$current.position === 0 ? {} : $current = $playlist[$current.position - 1]
	dispatch('play')
}
const handleShuffle = async () => {
	// TODO test
	const newItems: QueueItem[] = []
	console.log('lol');
	newItems.push(...$playlist.slice($current.position))
	// newItems.push(...[...($ignorePrev ? [...$playlist.slice(0, $current.position)] : []), ...$playlist.slice($lockNow ? $current.position : $current.position + 1)])
	const shuffledItems: QueueItem[] = [$current]
	// const shuffledItems: QueueItem[] = [...($ignorePrev ? [...$playlist.slice(0, $current.position)] : []), ...($lockNow ? [{ id: $current.position, item: $current }] : [])] 
	while (newItems.length > 0) {
		shuffledItems.push(...newItems.splice(Math.floor(Math.random() * newItems.length), 1))
	}
	$playlist = shuffledItems
	// items = shuffledItems.map((item, i) => { return { id: i, item: item }})
	// if ($lockNow) return
	$current = $playlist[0]
	dispatch('play')
}
</script>

<div class="controls" >
	<div class="controls__wrapper text">
		<Marquee/>
	</div>
	<div class="controls__wrapper button">
		<button class="controls__button shuffle" on:click={handleShuffle}>
			<svg class="controls__icon" viewBox="0 0 300 300" width="100px" height="100px" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
				<path d="M 255 230 L 255 255 L 285 210 L 255 165 L 255 190 L 225 190 C 150 190 180 70 75 70 L 15 70 L 15 110 L 75 110 C 150 110 120 230 225 230 L 255 230 Z"/>
				<path d="M 255 70 L 255 45 L 285 90 L 255 135 L 255 110 L 225 110 C 150 110 180 230 75 230 L 15 230 L 15 190 L 75 190 C 150 190 120 70 225 70 L 255 70 Z"/>
			</svg>
		</button>
		<button class="controls__button  prev" on:click={handlePrev}></button>
		<button class="controls__button  play" class:isPaused={$isPaused} on:click={() => dispatch('pause')}></button>
		<button class="controls__button  next" on:click={handleNext}></button>
		<button class="controls__button  loop" class:isLoop={$isLoop} on:click={() => () => $isLoop = !$isLoop}>
			<svg class="controls__icon" viewBox="0 0 300 300" width="100px" height="100px" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
				<path d="M 230 125 L 210 125 L 250 150 L 290 125 L 270 125 C 260 0 40 0 30 125 L 70 125 C 80 50 220 50 230 125 Z" origin="0.5 0.5"/>
				<path d="M 210 243.75 L 190 243.75 L 230 268.75 L 270 243.75 L 250 243.75 C 240 118.75 20 118.75 10 243.75 L 50 243.75 C 60 168.75 200 168.75 210 243.75 Z" transform="matrix(-1, 0, 0, -1, 280, 418.75)" origin="0.5 0.5"/>
			</svg>
		</button>
	</div>
</div>

<style>
.controls {
	position: absolute;
	bottom: 0;
	background-image: linear-gradient(180deg, var(--blue-10) 20%, var(--blue-15) 80%);
	display: flex;
}
.controls__wrapper {
	height: min(20.625vw, 5.5rem);
	padding: min(1.875vw, .5rem);
	display: flex;
	align-items: center;
	justify-content: center;
}
.controls__wrapper.text {
	width: 55vw;
} 
.controls__wrapper.button {
	width: 45vw;
} 
.controls__button {
	height: min(15vw, 4rem);
	width: min(15vw, 4rem);
	margin: min(.938vw, .25rem);
	border-style: solid;
	border-radius: 50%;
	border-width: min(.938vw, .25rem);
	background-color: transparent;
	border-color: var(--blue-45);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
.controls__button.play:after, .controls__button.prev:after, .controls__button.next:after, .controls__button.prev:before, .controls__button.next:before {
	content: '';
	position: absolute;
}
.controls__button, .controls__button:after, .controls__button:before, .controls__icon {
	transition-duration: .125s; 
	transition-timing-function: ease-in-out;
}
.controls__button, .controls__button:after, .controls__button:before {
	transition-property: transform, border-color;
} 
.controls__button:active {
	border-color: var(--blue-55);
	transform: translateY(min(.469vw, .125rem));
}
.controls__button.play:after {
	height: min(7.5vw, 2rem);
	border-style: double;
	border-width: 0 0 0 min(7.5vw, 2rem);
	border-color: transparent transparent transparent var(--blue-45);
	transition-property: border-width, border-color;
}
.controls__button.isPaused:after {
	height: 0;
	border-style: solid;
	border-width: min(3.75vw, 1rem) 0 min(3.75vw, 1rem) min(7.5vw, 2rem);
	border-color: transparent transparent transparent var(--blue-45);
}
.controls__button.next:before, .controls__button.next:after, .controls__button.prev:before, .controls__button.prev:after {
	border-style: solid;
	border-width: min(3.75vw, 1rem) 0 min(3.75vw, 1rem) min(3.75vw, 1rem);
	border-color: transparent transparent transparent var(--blue-45);
}
.controls__button.prev:before {
	transform: rotateZ(-180deg) translateX(calc(-1 * min(1.125vw, .3rem)));
}
.controls__button.prev:after {
	transform: rotateZ(-180deg) translateX(min(2.625vw, .7rem));
}
.controls__button.next:before {
	transform: translateX(calc(-1 * min(1.125vw, .3rem)));
}
.controls__button.next:after {
	transform: translateX(min(2.625vw, .7rem));
}
.controls__button:hover, .controls__button:active  {
	border-color: var(--blue-55);
}
.controls__button:hover:after, .controls__button:active:after, .controls__button:hover:before, .controls__button:active:before {
	border-color: transparent transparent transparent var(--blue-55);
}
.controls__icon {
	width: min(11.25vw, 3rem);
	height: min(11.25vw, 3rem);
	fill: var(--blue-45);
	transition-property: fill;
}
.controls__button:hover > .controls__icon, .controls__button:active > .controls__icon {
	fill: var(--blue-55); 
}
.controls__button.loop.isLoop {
	animation-name: Spin;
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

@keyframes Spin {
	0% {
		transform: rotateZ(0deg);
	}

	100% {
		transform: rotateZ(360deg);	
	}
}

@media only screen and (max-width: 840px) {
	.controls {
		width: 100vw;
		flex-direction: column;
	}
	.controls__wrapper.text, .controls__wrapper.button {
		height: 100%;
		width: 100vw;
	}
}
@media only screen and (max-width: 1080px) {
	.controls {
		position: sticky;
	}
}
</style>
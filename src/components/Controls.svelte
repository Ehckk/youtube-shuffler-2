<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { playlist, notifs, currentPos, current, playState, loop, shuffling, searching, queue } from "@/store";
	import Marquee from "./Marquee.svelte";
    import { sineOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import type { PlaylistItem } from "@/interfaces/PlaylistItem";
    import { NotifType } from "@/interfaces/NotifType";
    import PlayerStates from "youtube-player/dist/constants/PlayerStates";
	
	const dispatch = createEventDispatcher()
	// TODO use this to disable all buttons
	$: disabled = $searching || $shuffling
	$: isPaused = $playState === PlayerStates.PAUSED
	$: isLoop = $loop === true

	const handlePrev = async () => {
		if ($currentPos === 0) {
			notifs.push(NotifType.Red, `Start of Playlist`, `There is nothing to go back to`)
			return
		}
		playlist.prev()
		dispatch('play')
	}
	const handleNext = async () => {
		if ($currentPos === $playlist.length - 1) {
			notifs.push(NotifType.Red, `End of Playlist`, `There is nothing to skip to`)
			return
		}
		playlist.next()
		dispatch('play')
	}
	const handleShuffle = () => {
		// TODO shuffle options such as skipPrev and lockCurrent
		$shuffling = true
		notifs.push(NotifType.Yellow, 'Shuffling...')
		playlist.shuffle().then(() => {
			$shuffling = false
			$queue.scrollTo({ top: $queue.offsetTop - 144, behavior: 'smooth' })
			// TODO only update currentIndex if the song pos changes ? 
		})
		$currentPos = 0
	}
</script>

<div class="controls" transition:fly="{{ y: 50, duration: 500, easing: sineOut }}">
	<div class="controls__wrapper button">
		<button class="controls__button  loop" class:isLoop class:disabled on:click={() => $loop = !$loop}>
			<svg class="controls__icon" viewBox="0 0 300 300" width="100px" height="100px" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
				<path d="M 230 125 L 210 125 L 250 150 L 290 125 L 270 125 C 260 0 40 0 30 125 L 70 125 C 80 50 220 50 230 125 Z" origin="0.5 0.5"/>
				<path d="M 210 243.75 L 190 243.75 L 230 268.75 L 270 243.75 L 250 243.75 C 240 118.75 20 118.75 10 243.75 L 50 243.75 C 60 168.75 200 168.75 210 243.75 Z" transform="matrix(-1, 0, 0, -1, 280, 418.75)" origin="0.5 0.5"/>
			</svg>
		</button>
		<button class="controls__button  prev" class:disabled on:click={handlePrev}></button>
		<button class="controls__button  play" class:isPaused class:disabled on:click={() => dispatch('pause')}></button>
		<button class="controls__button  next" class:disabled on:click={handleNext}></button>
		<button class="controls__button shuffle" class:disabled on:click={handleShuffle}>
			<svg class="controls__icon" viewBox="0 0 300 300" width="100px" height="100px" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
				<path d="M 255 230 L 255 255 L 285 210 L 255 165 L 255 190 L 225 190 C 150 190 180 70 75 70 L 15 70 L 15 110 L 75 110 C 150 110 120 230 225 230 L 255 230 Z"/>
				<path d="M 255 70 L 255 45 L 285 90 L 255 135 L 255 110 L 225 110 C 150 110 180 230 75 230 L 15 230 L 15 190 L 75 190 C 150 190 120 70 225 70 L 255 70 Z"/>
			</svg>
		</button>
	</div>
	<div class="controls__wrapper text">
		<Marquee item={$current}/>
	</div>
</div>

<style>
.controls {
	grid-area: controls;
	width: 98%;
	margin-bottom: min(.5rem, 1.25vw);
	border-radius: min(1rem, 2.5vw);
	background-color: var(--blue-700);	
	display: flex;
	position: sticky;
	bottom: 0;
	box-shadow: inset 0 1px 0 var(--blue-600), 0px 1px 3px hsla(0, 0%, 0%, .5);
}
.controls__wrapper {
	height: min(6.5rem, 16.25vw);
	display: flex;
	align-items: center;
	justify-content: center;
}
.controls__wrapper.button {
	width: 40%;
	margin-left: min(2rem, 5vw);
}
.controls__wrapper.text {
	width: 60%;
}
.controls__button {
	height: min(10vw, 4rem);
	width: min(10vw, 4rem);
	margin: min(1.25vw, .5rem);
	border-style: none;
	border-radius: 50%;
	background-color: var(--blue-500);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: inset 0 1px 0 var(--blue-400), 0px 1px 3px hsla(0, 0%, 0%, .5);
}
.controls__button.shuffle {
	margin-left: min(5vw, 2rem);
}
.controls__button.loop {
	margin-right: min(5vw, 2rem);
}
.controls__button:hover {
	transition-property: transform;
	transform: scale(1.125);
}
.controls__button.play:after, .controls__button.prev:after, .controls__button.next:after, .controls__button.prev:before, .controls__button.next:before {
	content: '';
	position: absolute;
}
.controls__button, .controls__button:hover, .controls__button:after, .controls__button:before, .controls__icon {
	transition-duration: .125s; 
	transition-timing-function: ease-in-out;
}
.controls__button, .controls__button:after, .controls__button:before {
	transition-property: transform, border-color;
} 
.controls__button:active, .controls__button.disabled {
	background-color: var(--blue-600);
	transform: translateY(min(.5vw, .125rem));
	box-shadow: none;
}
.controls__button.play:after {
	height: min(5vw, 2rem);
	border-style: double;
	border-width: 0 0 0 min(5vw, 2rem);
	border-color: transparent transparent transparent var(--grey-200);
	transition-property: all;
}
.controls__button.isPaused:after {
	height: 0;
	border-style: solid;
	border-width: min(2.5vw, 1rem) 0 min(2.5vw, 1rem) min(5vw, 2rem);
}
.controls__button.next:before, .controls__button.next:after, .controls__button.prev:before, .controls__button.prev:after {
	border-style: solid;
	border-width: min(2.5vw, 1rem) 0 min(2.5vw, 1rem) min(2.5vw, 1rem);
	border-color: transparent transparent transparent var(--grey-200);
}
.controls__button.prev:before {
	transform: rotateZ(-180deg) translateX(calc(-1 * min(.75vw, .3rem)));
}
.controls__button.prev:after {
	transform: rotateZ(-180deg) translateX(min(1.75vw, .7rem));
}
.controls__button.next:before {
	transform: translateX(calc(-1 * min(.75vw, .3rem)));
}
.controls__button.next:after {
	transform: translateX(min(1.75vw, .7rem));
}
.controls__button:hover, .controls__button:active  {
	border-color: var(--blue-200);
}
.controls__icon {
	width: min(3rem, 7.5vw);
	height: min(3rem, 7.5vw);
	fill: var(--grey-200);
}
.controls__button.loop.isLoop {
	background-color: var(--blue-600);
	animation-name: Spin;
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	box-shadow: none;
}
.controls__button.disabled {
	pointer-events: none;
}

@keyframes Spin {
	0% {
		transform: translateY(min(.5vw, 1.25rem)) rotateZ(0deg);
	}

	100% {
		transform: translateY(min(.5vw, 1.25rem)) rotateZ(360deg);	
	}
}

@media only screen and (max-width: 1100px) {
	.controls {
		flex-direction: column-reverse;
	}
	.controls__wrapper.button {
		width: 100%;
		margin: 0;
	}
	.controls__wrapper.text {
		width: 100%;
	}
}
</style>
<script lang='ts'>
	import Controls from './Controls.svelte';
	import { getThumbnail } from '../utils/getThumbnail';
	import { onMount } from 'svelte';
	import YoutubePlayer from 'youtube-player';
	import { playlist, current, lockNow, ignorePrev, playState, isLoop, isPaused } from '../store';
	import type { PlaylistItem, QueueItem } from '../interfaces';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import PlayerStates from 'youtube-player/dist/constants/PlayerStates.js';
import Queue from './Queue.svelte';
		
	let player: YouTubePlayer
	let innerWidth: number;
	let hidden = false;
	$: playerWidth = innerWidth > 640 ? innerWidth: 640;
	$: playerHeight = innerWidth > 640 ? (innerWidth * .5265) : 390;
	$: thumbnail =  $current !== undefined ? getThumbnail($current.item) : getThumbnail($playlist[0].item)
	$: isShuffling: true // TODO lol (for disabling buttons)
	$current = $playlist[0]
	// while buttons are disabled, change scro0lling text content to ...shuffling"
	onMount(() => {
		player = YoutubePlayer('player', { width: playerWidth, height: playerHeight, playerVars: {  autoplay: 1 }})
		player.setVolume(100);
		// TODO make a volume slider
		// TODO remove default player styles
		player.on('ready', async () => await play())
		player.on('stateChange', async (e) => {
			$playState = e.data
			switch ($playState) { // TODO why a store bruh
				case 0:
					if (($current.position + 1) < $playlist.length) {
						if ($isLoop === false) {
							$current = $playlist[$current.position + 1] 
						} 
						await play()
					}
					break;
				case 1:
					$isPaused = false
					break;
				case 2:
					$isPaused = true
					break;
			}			
		})
	});
	// TODO: touch support 
	const play = async () => {
		await player.loadVideoById($current.item.contentDetails.videoId)
		await player.playVideo()		
	} 
	const pause = async () => {
		const playerState = await player.getPlayerState()
		if (playerState !== PlayerStates.PAUSED && playerState !== PlayerStates.PLAYING) return
		playerState === PlayerStates.PAUSED ? await player.playVideo() : await player.pauseVideo()
	}
</script>
<!-- TODO on:keydown={handleKeyDown} on:keyup={handleKeyUp} -->
<svelte:window bind:innerWidth />
<div class="wrapper">
	<!-- <div class="background" style={`background-image: url(${thumbnail});`}></div> -->
	<!-- <span class="player__section">
		<button class="player__hide" on:click={() => hidden = !hidden}>Hide Player</button>
	</span>	 -->
	<div class="player__wrapper">
		<div id="player" class:hidden></div>
	</div>
	<Queue on:play={async () => await play()} />
</div>
<Controls on:pause={async () => await pause()} on:play={async () => await play()}/>
<style>
.wrapper {
	width: 100%;
	display: grid;
	grid-template-columns: 60%, 1fr;
}
/* .background {
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center center;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	opacity: .7;
	background-color: black;
} */
.player__wrapper {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
#player {
	width: 640px;
	height: 390px;
	opacity: 100;
}
@media screen and (max-width: 640px) {
	/* .player__section {
		width: 100vw;
		background-color: var(--blue-10);
		color: var(--blue-75);
		text-align: center;
		z-index: 100;
	}
	.player__hide {
		height: min(5.625vw, 1.5rem);
		width: min(20.625vw, 5.5rem);
		margin: min(1.875vw, .5rem);
		border-radius: min(2.813vw, .75rem);
		border-width: 0;
		background-color: var(--blue-45);
		color: var(--blue-80);
		font-size: min(2.813vw, .75rem);
	} 
	.player__hide:hover {
		background-color: var(--blue-50);
	}
	.player__hide:active {
		transform: translateY(.125rem);
	} */
	.wrapper {
		grid-template-columns: 1fr;
	}
	#player {
		margin-top: 1vh;
		width: 100vw;
		height: calc(100vw / 1.64);
	}
} 
@media screen and (min-width: 1080px) {
	.wrapper {
		
		grid-template-columns: 1fr 1fr;
	}
	.player__wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
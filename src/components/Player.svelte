<script lang='ts'>
	import YoutubePlayer from 'youtube-player';
	import { notifs, playlist, currentPos, current, playState } from '@/store';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import { sineOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { NotifType } from '@/interfaces/NotifType';
    import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
    import Spinner from './Spinner.svelte';

	let loading: boolean = true
	let player: YouTubePlayer
	let innerWidth: number
	let getVolume: () => Promise<number> = async () => { return 0 }
	let setVolume: (volume: number) => Promise<void> = async (volume: number) => {}
	$: playerWidth = innerWidth > 640 ? innerWidth : 640
	$: playerHeight = innerWidth > 640 ? (innerWidth * .5265) : 390

	const initPlayer = (node: HTMLElement) => {
		player = YoutubePlayer(node, { width: playerWidth, height: playerHeight, playerVars: {  autoplay: 1 }})
		player.setVolume(50);
		getVolume = player.getVolume
		setVolume = player.setVolume
		// TODO remove default player styles
		player.on('ready', async () => {
			loading = false
			await play()
		})
		player.on('stateChange', async (e) => {
			console.log(e.data);
			$playState = e.data
			if ($playState === PlayerStates.ENDED) {
				if (($currentPos + 1) >= $playlist.length) {
					notifs.push(NotifType.Yellow, 'End of playlist', undefined, 5000)
					return
				}
				if (playlist.isLooping === false) {
					playlist.next()
				} 
				return play()
			}
		})
		player.on('error', async () => {
			const fail = $current
			notifs.push(NotifType.Red, 'Unable to Play', `Playback of ${fail.snippet.title} disabled by owner`, 5000)
			notifs.push(NotifType.Yellow, 'Removing unplayable video...', undefined, 5000)
			playlist.remove($current)
			if ($currentPos === $playlist.length - 1) {
				notifs.push(NotifType.Yellow, 'End of playlist', undefined, 5000)
				return
			}
			await play()
		})
	} 
	const play = async () => {
		notifs.push(NotifType.Green, 'Now Playing', `${$current.snippet.title}`)
		try {
			await player.loadVideoById($current.contentDetails.videoId)
			await player.playVideo()	
		} catch {
			console.log('🐷')
		}
	}
	const pause = async () => {
		if ($playState !== PlayerStates.PAUSED && $playState !== PlayerStates.PLAYING) return
		$playState === PlayerStates.PAUSED ? await player.playVideo() : await player.pauseVideo()
	}
	
</script>

<svelte:window bind:innerWidth />
<div class="playerContainer">
	<div id="player" use:initPlayer in:fly="{{ y: 50, duration: 500, easing: sineOut }}"></div>
	{#if loading}
		<div class="playerSpinner">
			<Spinner/>
		</div>
	{/if}
	<!-- TODO Option menu and volume slider -->
	<!-- TODO Override shitty youtube player styles in a css stylesheet -->
</div>
<slot {play} {pause} volume={{ set: setVolume, get: getVolume }}/>

<style>
	.playerContainer {
		width: calc(640px + min(2.5rem, 6.25vw));
		height: calc(390px + min(2.5rem, 6.25vw));
		border-radius: min(1rem, 2.5vw);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--blue-800);
		box-shadow: inset 0 1px 0 var(--blue-700), 0px 1px 3px hsla(0, 0%, 0%, .5);
	}
	#player {
		grid-area: player;
		width: 640px;
		height: 390px;
		opacity: 100;
		/* TODO LOL LOL */
	}
	.playerSpinner {
		width: calc(640px + min(2.5rem, 6.25vw));
		height: calc(390px + min(2.5rem, 6.25vw));
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
	}
@media screen and (max-width: 720px) {
	#player, .playerContainer {
		width: min(88vw, 640px);
		height: calc(min(88vw, 640px) / 1.64);
	}
	.playerContainer {
		width: calc(min(88vw, 640px) + min(2.5rem, 6.25vw));
		height: calc(calc(min(88vw, 640px) / 1.64) + min(2.5rem, 6.25vw));
	}
} 
</style>
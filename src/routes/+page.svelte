<script lang="ts">
	import SearchBar from '@/components/SearchBar.svelte';
    import Spinner from '@/components/Spinner.svelte';
    import Card from '@/components/Card.svelte';
	import Player from '@/components/Player.svelte';
	import Queue from '@/components/Queue.svelte';
	import Controls from '@/components/Controls.svelte';
    import { getPlaylistItems } from '@/utils/getPlaylistItems';
    import { getPlaylist } from '@/utils/getPlaylist';
    import { formatQuery } from '@/utils/formatQuery';
	import { notifs, playlist, currentPos, searching } from '@/store'
    import type { Playlist } from '@/interfaces/Playlist';
    import { NotifType } from '@/interfaces/NotifType';

	let player = {}
	let playlistId = '';
	let fetchPlaylist: Promise<Playlist | null>;
	let queue: HTMLDivElement; // TODO ??

	// $: scrollHeightPerItem = queue && $playlist.length > 0 ? (queue.scrollHeight / $playlist.length) : 0; TODO lol

	const playlistSearch = async (value: string) => {
		player = {}
		playlist.clear()
		$currentPos = 0
		playlistId = value
		console.log($playlist.length, playlistId);
		fetchPlaylist = getPlaylist(formatQuery(value)).catch((error) => {
			notifs.push(NotifType.Red, `${error}`)
			return null
		}).finally(() => $searching = false)
	}

	const playlistItemsSearch = async () => await getPlaylistItems(formatQuery(playlistId), true, null)

	const scroll = (node: HTMLElement) => window.scrollTo({ top: node.getBoundingClientRect().top, behavior: 'smooth' })
</script>

<SearchBar {player} on:search={(e) => playlistSearch(e.detail.key)}/>
{#key player}
{#await fetchPlaylist}
	<Spinner/>
	{:then playlistData}
		{#if playlistData}
		<div class="cardWrapper" use:scroll>
			<Card {playlistData}/>
		</div>
		<div class="playerWrapper">
		{#await playlistItemsSearch()}
			<Spinner/>
		{:then}	
		<!-- TODO: Why pass events when you can just use stores?  -->
		<Player let:play let:pause>
			<Queue {play}/>
			<Controls on:pause={() => pause()} on:play={() => play()}/>
		</Player>
		{/await}
		</div>
		{/if}
	{/await}
{/key}

<style>
	.cardWrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.playerWrapper {
		position: relative;
		min-height: 100vh;
		display: grid;
		grid-template-areas: "player queue" "controls controls";
		grid-template-rows: 1fr min(7rem, 17.5vw);
		grid-template-columns: 1fr 1fr;
		align-items: center;
		justify-items: center;
	}
	@media screen and (max-width: 1280px) {
		.playerWrapper {
			grid-template-areas: "player" "queue" "controls";
			grid-template-rows: calc((min(88vw, 640px) / 1.64) + min(2.5rem, 6.25vw)) 1fr min(7rem, 17.5vw);
			grid-template-columns: 100%;
		}
	}
	@media only screen and (max-width: 1100px) {
		.playerWrapper {
			grid-template-rows: calc((min(88vw, 640px) / 1.64) + min(2.5rem, 6.25vw)) 1fr min(13.5rem, 33.75vw);
		}
	}
</style>
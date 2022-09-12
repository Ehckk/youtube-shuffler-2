<script lang="ts">
import Item from './Item.svelte';
import { current, playlist } from '../store'
import { getThumbnail } from '../utils/getThumbnail';
import type { QueueItem } from '../interfaces';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher()
let queue: HTMLDivElement;
$: scrollHeightPerItem = queue ? (queue.scrollHeight / $playlist.length) : 0; // TODO lol

const move = (index: number, direction: 'UP' | 'DOWN') => {
	const newPlaylist =  $playlist.map((item) => item)
	const moved: QueueItem[] = [] 
	console.log(index, $current.position);
	if (direction == 'UP' && index !== 0) {
		moved.push(...newPlaylist.splice(index, 1))
		newPlaylist.splice(index === $current.position + 1 ? $current.position === 0 ? 0 : $current.position : index - 1, 0, ...moved)
	}
	if (direction == 'DOWN' && index !== $playlist.length) {
		moved.push(...newPlaylist.splice(index, 1))
		newPlaylist.splice(index === $current.position - 1 ? $current.position === $playlist.length - 1 ? $playlist.length - 1 : $current.position : index + 1, 0, ...moved)
	}
	$playlist = newPlaylist
	dispatch('play')
	// $playlist = $playlist.map((item, i) => { return { id: i, item: item }}) TODO 🐷
}

const playNow = async (item: QueueItem) => {
	if ($current === item) return
	$current = item
	// TODO FIX ALL OF THIS SHIT BRUH 
	// if ($current.position >= $playlist.length - 3) {
	// 	queue.scrollTo({ top: queue.scrollHeight })
	// }
	// if ($current.position < 2) {
	// 	queue.scrollTo({ top: 0 })
	// }
	// queue.scrollTo({ top: ($current.position - 1) * scrollHeightPerItem })
	dispatch('play')
}

</script>
<style>
/* TODO: fix styles for mobile devices */
.queue {
	max-height: calc(100vh - min(15vw, 4rem) - min(11.25vw, 3rem) - min(11.25vw, 3rem) - min(11.25vw, 3rem) - min(1.875vw, .5rem));
	width: 100%;
	right: 0;
	overflow-y: scroll;
}
.queue::-webkit-scrollbar {
	width: min(3.75vw, 1rem);
}
.queue::-webkit-scrollbar-track {
	background-image: linear-gradient(var(--blue-5) 20%, var(--blue-10) 80%);
	border-radius: min(1.875vw, .5rem);
}
.queue::-webkit-scrollbar-thumb {
	background-color: var(--blue-50);
	border-radius: min(1.875vw, .5rem);
}
@media screen and (min-width: 1080px) {

}
</style>
<!-- style={`max-height: ${(innerHeight - dashHeight - controlHeight)}px`} -->
<div class="queue" bind:this={queue} >
	{#each $playlist as item}
		<Item {item} on:moveup={() => move(item.position, 'UP')} on:movedown={() => move(item.position, 'DOWN')} on:playnow={async () => await playNow(item)}/>
	{/each}
</div>
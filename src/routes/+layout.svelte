<script lang="ts">
    import { flip } from 'svelte/animate';
    import { sineOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
	import '@/app.css'
    import Notification from '@/components/Notification.svelte';
	import { notifs } from "@/store";

	$: items = $notifs.filter((i) => i)
</script>

<slot/>
<div class="notifBar">
	{#if items.length > 0}
		{#each items as notif (notif.id)}
			<!-- svelte-ignore missing-declaration -->
			<div class="notifWrapper" 
				in:fly="{{ y: 50, duration: 200, easing: sineOut }}" 
				out:fade="{{ duration: 200, easing: sineOut }}" 
				animate:flip="{{ duration: 200, easing: sineOut }}">
				<Notification item={notif}></Notification>
			</div>
		{/each}
	{/if}
</div>

<style>
	.notifBar {
		position: fixed;
		max-width: min(23rem, 57.5vw);
		padding: min(1rem, 2.5vw);
		max-height: 100vh;
		overflow-y: scroll;
		scrollbar-width: 0;
		top: 0;
		left: 0;
		margin-top: min(1rem, 2.5vw);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.notifBar::-webkit-scrollbar {
		width: 0;
	}
</style>
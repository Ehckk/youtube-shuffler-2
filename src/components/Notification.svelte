<script lang="ts">
    import { linear } from "svelte/easing";
    import { NotifType } from "@/interfaces/NotifType";
	import { tweened } from 'svelte/motion';
    import { notifs } from "@/store";
    import type { Notif } from "@/interfaces/Notif";

	export let item: Notif
	
	const timeout = tweened(0, { delay: item.duration ?? 3000, easing: linear })
	const close = () => notifs.pop(item.id)
	
	$: timeout.set(++$timeout).then(close)

</script>

<div class="notif {item.type == NotifType.Red ? 'red' : item.type == NotifType.Yellow ? 'yellow' : 'green'}">
	<span class="notifIconWrapper">	
		{#if item.type === NotifType.Red}				
		<svg class="notifIcon" viewBox="5 5 90 90">
			<path fill="var(--grey-100)" d="M 70 80 L 80 70 L 30 20 L 20 30 L 70 80 Z"></path>
			<path fill="var(--grey-100)" d="M 69.954 20 L 79.954 30 L 30 80 L 20 70 L 69.954 20 Z"></path>
			</svg>
		{:else if item.type === NotifType.Yellow}
		<svg class="notifIcon" viewBox="5 5 90 90">
			<path fill="var(--grey-100)" d="M 55 13 L 40 13 L 45 70 L 55 70 L 60 13 Z"></path>
			<ellipse fill="var(--grey-100)" cx="50" cy="80" rx="7" ry="7"></ellipse>
		</svg>
	{:else}
		<svg class="notifIcon" viewBox="0 0 100 100">
			<path fill="var(--grey-100)" d="M 77 27 L 88 38 L 38 88 L 27 77 L 11 61 L 22 50 L 38 66 L 77 27 Z"></path>
		</svg>
		{/if}				
	</span>
	<h2 class="notifTitle">{item.message}</h2>
	{#if item.info}
		<p class="notifInfo">{item.info}</p>
	{/if}
</div>

<style>
	.notif {
		width: min(20rem, 50vw);
		margin: min(.5rem, 1.25vw);
		padding: min(.5rem, 1.25vw);
		border-radius: min(.5rem, 1.25vw);
		display: grid;
		grid-template-areas: "icon title" "info info";
		grid-template-columns: min(3.25rem, 8.125vw) 1fr;
		grid-template-rows: min(3rem, 7.5vw) fit-content;
		align-items: center;
		justify-items: center;
		text-align: left;
	}
	.notifIconWrapper {
		grid-area: icon;
		width: min(3rem, 7.5vw);
		height: min(3rem, 7.5vw);
		margin-right: min(.25rem, .625vw);
		padding-left: min(.25rem, .625vw);
		display: flex;
		justify-content: center;
		align-items: center;

	} 
	.notifTitle {
		grid-area: title;
		width: 100%;
		padding-left: min(.25rem, .625vw);
		color: var(--grey-100);
		font-size: min(1.5rem, 3.75vw);;
		font-weight: 500;
	}
	.notifInfo {
		grid-area: info;
		padding: min(.5rem, 1.25vw);
		font-weight: 500;
		text-align: left;
	}
	.red {
		background-color: var(--red-600);
	}
	.red .notifInfo {
		color: var(--red-100);
	}
	.yellow {
		background-color: var(--yellow-600);
	}
	.yellow .notifInfo {
		color: var(--yellow-100);
	}
	.green {
		background-color: var(--green-600);
		/* TODO: shadow transparency */
	}
	.green .notifInfo {
		color: var(--green-100);
	}
</style>
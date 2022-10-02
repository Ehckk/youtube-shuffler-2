<script>
    import { NotifType } from "@/interfaces/NotifType";
    import { notifs, showSettings, shuffleOptions } from "@/store";
    import { sineInOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";

	
</script>

{#if $showSettings}
<div class="modal" transition:fade="{{ duration: 200, easing: sineInOut }}">
	<div class="modal__card" in:fly="{{ y: 50, duration: 200, easing: sineInOut }}" out:fade="{{ duration: 200, easing: sineInOut }}">
		<!-- <div class="switch__wrapper">
			<label class="switch__label" for="ignorePrev">Ignore Previous:</label>
			<input name="ignorePrev" class="switch__track" type="checkbox" bind:checked={$shuffleOptions.ignorePrev} on:change="{() => {
				$shuffleOptions.ignorePrev = !$shuffleOptions.ignorePrev
				notifs.push(NotifType.Yellow, 
					`Ignore Previous - ${$shuffleOptions.ignorePrev ? 'ENABLED' : 'DISABLED'}`, 
					`Already played songs WILL ${$shuffleOptions.ignorePrev ? 'NOT ' : ''}be included in shuffles`, 2000)
			}}"/>
			<span class="switch__handle"></span>
		</div> -->
		<!-- For some reason the top switch works, the bottom one doesn't ?? -->
		<div class="switch__wrapper">
			<label class="switch__label" for="keepCurrent">Keep Current:</label>
			<input name="keepCurrent" class="switch__track" type="checkbox" bind:checked={$shuffleOptions.keepCurrent} on:click="{() => {
				$shuffleOptions.keepCurrent = !$shuffleOptions.keepCurrent
				notifs.push(NotifType.Yellow, 
					`Keep Current - ${$shuffleOptions.keepCurrent ? 'ENABLED' : 'DISABLED'}`, 
					`The current song WILL ${$shuffleOptions.keepCurrent ? 'NOT ' : ''}be included in shuffles`, 2000)
			}}"/>
			<span class="switch__handle"></span>
		</div>
		<button class="modal__button" on:click="{() => $showSettings = false}">Close</button>
	</div>
</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		width: 100%;
		height: min(100%, 100vh);
		background-color: hsl(0, 0%, 0%, .5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal__card {
		width: min(30rem, 60vw);
		height: min(30rem, 60vw);
		border-radius: min(1rem, 2vw);
		background-color: var(--blue-800);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.modal__button {
		height: min(4rem, 10vw);
		width: min(12rem, 30vw);
		margin: min(1rem, 2vw);
		border-style: none;
		border-width: 0;
		border-radius: min(.5rem, 1.25vw);
		background-color: var(--blue-500);
		color: var(--grey-200);
		font-size: min(2.5rem, 6.25vw);
		font-weight: 700;
		user-select: none;	
		box-shadow: inset 0 1px 0 var(--blue-400), 0 1px 3px hsla(0, 0%, 0%, .2);
		transition-duration: .125s; 
		transition-timing-function: ease-in-out;
		transition-property: transform;
	}
	.modal__button:hover {
		transform: scale(1.125);
	}
	.modal__button:active {
		transform: translateY(min(.25rem, .625vw));
		background-color: var(--blue-600);
		box-shadow: none;
	}
	.switch__wrapper {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.switch__label {
		width: 100%;
		margin-left: min(1rem, 2vw);
		margin-bottom: min(1rem, 2vw);
		margin-top: min(1rem, 2vw);
		text-align: left;
		font-size: min(2rem, 5vw);
		color: var(--grey-200);
		font-weight: 400;
		user-select: none;
	}
	.switch__track {
		appearance: none;
		width: min(8rem, 16vw);
		height: min(2.5rem, 5vw);
		border-radius: min(1.5rem, 3vw);
		margin-right: min(1rem, 2vw);
		background-color: var(--grey-300);
		outline: none;
		transition-property: background-color;
		transition-timing-function: ease-in-out;
		transition-duration: .25s;
	}
	.switch__track:checked {
		background-color: var(--green-600);
	}
	.switch__handle {
		position: absolute;
		right: 0;
		width: min(2rem, 4vw);
		height: min(2rem, 4vw);
		border-radius: 50%;
		background-color: var(--grey-600);
		transition-property: transform, background-color;
		transition-timing-function: ease-in-out;
		transition-duration: .25s;
		transform: translateX(-230%);
	}
	.switch__track:checked + .switch__handle {
		transform: translateX(-60%);
	}
</style>
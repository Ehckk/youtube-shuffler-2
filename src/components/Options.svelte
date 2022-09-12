<script lang="ts">
	// import Switch from "../components/Switch.svelte";
	import { get } from "svelte/store";
	import { lockNow, ignorePrev } from "../store";
	let expand: boolean = false;
	// let options: Option[] = [
	// 	{
	// 		name: 'shift',
	// 		label: 'Alt Button Mode: ',
	// 	},
	// 	{
	// 		name: 'playing_lock',
	// 		label: 'Current Song Lock',
	// 		store: lockNow
	// 	},
	// 	{
	// 		name: 'shuffle_only_next',
	// 		label: 'Only Shuffle Next',
	// 		store: ignorePrev
	// 	}
	// ]

	function handleClick() {
		if (expand) {
			expand = false;
			return
		}
		expand = true;
		return
	}

	function handleToggle(e: CustomEvent) {
		e.detail.store.set(!get(e.detail.store))
	}
</script>

	<div class="expand_options" class:expand on:click={handleClick}>
	</div>
	<section class="option_menu" class:expand>
		<!-- <div class="switch_box" class:expand>
			<Switch name={option.name} label={option.label} store={option.store} on:toggle={handleToggle}/>
		</div> -->
	</section>

<style>
	.wrapper {
		width: 100%;
		position: relative;
	}

	.expand_options {
		height: 2em;
		width: 100%;
		z-index: 0;
		background-color: var(--color-1);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.option_menu {
		height: 0rem;
		background-color: var(--color-3);
		position: relative;
		transition: all var(--transition);
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
/* TODO: add transitions to everything because lightmode */
	.option_menu.expand {
		visibility: visible;
		opacity: 1;
		height: 5rem;
	}

	.switch_box {
		height: 48px;
		padding: 8px;
		position: relative;
		top: -2rem;
		opacity: 0;
		visibility: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all .25s ease;
	}

	.switch_box.expand {
		top: 0em;
		visibility: visible;
		opacity: 1;
	}

	button.help_options {
		height: 2em;
		width: 2em;
		margin: .5em;
		padding: .5em;
		border-radius: 1em;
		border-width: 0;
		background-color: var(--util-2);
		color: var(--light-4);
		line-height: 1em;
		opacity: 0;
		cursor: pointer;
		transition: all .25s ease;
	}

	.option_menu.expand button.help_options {
		opacity: 100;
	}

	@media only screen and (max-width: 1360px) {
	/* TODO: 🤢🤢🤢🤢🤢*/
		.option_menu {
			height: 0em;
			top: -12.5em;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			visibility: hidden;
		}

		.switch_box {
			min-width: 20rem;
			justify-content: space-between;
			opacity: 0;
			visibility: hidden;
		}

		.option_menu.expand {
			height: fit-content;
			top: 0;
			opacity: 1;
			display: flex;
			visibility: visible;
		}

		.switch_box.expand {
			visibility: visible;
			opacity: 1;
		}
	}
</style>
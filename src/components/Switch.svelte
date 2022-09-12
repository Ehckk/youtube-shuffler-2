<script lang='ts'>
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte/internal';

	export let name: string;
	export let label: string;
	export let store: Writable<boolean>;

	const dispatch = createEventDispatcher();
</script>

<div class="switch_label" >{label}</div>
<label for={name} on:click={() => dispatch('toggle', { store: store })}>
	<input type="checkbox" for={name} bind:checked={$store}/>
	<span></span>
</label>

<style>
	.switch_label {
		margin-right: 8px;
		font-size: 20px;	
		color: var(--font-color);
	}

	label {
		height: 32px;
		width: 64px;
		border-radius: 32px;
		padding: 6px;
		position: relative;
		background-color: var(--util-3);
		display: inline-block;
		cursor: pointer;
	}

	input {
		display: none;
	}

	span {
		background-color: var(--util-1);
		height: 24px;
		width: 24px;
		border-radius: 24px;
		position: absolute;
		top: 4px;
		left: 4px;
		transition: all var(--transition);
	}

	input:checked + span {
		transform: translateX(32px);
	}

	@media only screen and (max-width: 1360px) {
		
	}

	@media only screen and (max-width: 720px) {
		
	}
</style>
<script lang="ts">
    import { sineOut } from "svelte/easing";
    import { fly } from "svelte/transition";
</script>

<div class="spinnerWrapper">
	<div class="spinner" in:fly="{{ y: 50, duration: 200, easing: sineOut }}" >
		<svg class="spinner__logo" viewBox="0 0 200 200" width="100" height="100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
			<linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
			<stop offset="25%" stop-color="var(--blue-900)" />
			<stop offset="75%" stop-color="var(--blue-800)" />
			</linearGradient>
			<ellipse fill="url(#bg)" cx="100" cy="100" rx="75" ry="75"/>
			<path stroke="var(--blue-500)" stroke-width="3" fill="none" d="M 80 90 C 80 135 120 135 120 90"/>
			<ellipse fill="var(--blue-500)" cx="145" cy="100" rx="12" ry="12"/>
			<ellipse fill="var(--blue-500)" cx="55" cy="100" rx="12" ry="12"/>
		</svg>
	</div>
</div>

<style>
	.spinner {
		position: relative;
		height: min(10rem, 25vw);
		width: min(10rem, 25vw);
		border-radius: 50%;
		background-image: conic-gradient(transparent 20%, var(--blue-600) 90%);
		animation-name: Spin;
		animation-duration: 1s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	.spinner::after {
		content: '';
		position: absolute;
		top: 0;
		left: calc(50% - .625rem);
		height: min(1.25rem, 3.125vw);
		width: min(1.25rem, 3.125vw);
		border-radius: 50%;
		background-color: var(--blue-600);
	}
	.spinner__logo {
		z-index: 50;
		height: min(10rem, 25vw);
		width: min(10rem, 25vw);
	}
	.spinnerWrapper {
		min-height: min(16rem, 40vw);
		min-width: min(16rem, 40vw);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@keyframes Spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

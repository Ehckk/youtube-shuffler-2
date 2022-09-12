<script lang="ts">
import { current } from '../store'

let titleWidth: number = 0;
let boxWidth: number = 0;
$: scrollOverFlow = boxWidth - titleWidth 
$: scrollOffset = scrollOverFlow < 0 ? scrollOverFlow : 0;
</script>

<style>
.marquee__window {
	width: 90%;
	overflow-x: hidden;
	display: block;
}

.marquee__text {
	height: 100%;
	width: fit-content;
	display: inline-block;
	color: var(--blue-85);
	font-size: min(5.625vw, 1.5rem);
	white-space: nowrap;
	transition-property: height;
	transition-duration: .125s; 
	transition-timing-function: ease-in-out;
	animation-name: SlideText; 
	animation-duration: 4s; /* TODO Set dynamically based on the magnitude of the text overflow */
	animation-timing-function: ease-in-out; 
	animation-iteration-count: infinite;
}

.marquee__window:active > .marquee__text {
	color: var(--blue-75);
}
.marquee__window:hover > .marquee__text {
	color: var(--blue-85);
}
@keyframes SlideText {
	20% {
		transform: translateX(0);
	}
	80% {
		transform: translateX(var(--scroll-offset));
	}
	100% {
		transform: translateX(var(--scroll-offset));
	}
}
</style>

<a class="marquee__window" style={`--scroll-offset: ${scrollOffset}px;`} bind:clientWidth={boxWidth} href={`https://www.youtube.com/watch?v=${$current.item.contentDetails.videoId}`} target="_blank">
	<h3 class="marquee__text" bind:clientWidth={titleWidth}>{$current.item.snippet.title}</h3>
</a>
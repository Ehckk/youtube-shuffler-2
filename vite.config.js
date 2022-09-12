import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
	define: {
		'process.env': process.env
	},
	plugins: [sveltekit(), svg({ type: 'url' })],
}) 
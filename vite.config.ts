import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
// import tailwindcss from '@tailwindcss/vite'
import UnoCSS from 'unocss/vite';

const config: UserConfig = {
	plugins: [
		UnoCSS(),
		// tailwindcss(),
		sveltekit()
	],
	server: {
		port: 3002,
	},
};

export default config;

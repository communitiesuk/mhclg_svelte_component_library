import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['node_modules/govuk-frontend']
		}
	},
	resolve: {
		alias: {
			$routes: '/src/routes'
		}
	}
});


import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(),
		{
      name: 'inject-filepath',
      transform(code, id) {
        if (id.endsWith('.svelte')) {
          return code.replace('__FILE_PATH__', JSON.stringify(id));
        }
        return code;
      }
    }
	],
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


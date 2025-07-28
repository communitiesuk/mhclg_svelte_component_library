# Setting up npm link - configuring branches to point to different entry points

[Npm_link_setup-part-1](./Npm_link_setup-part-1.md) provides instructions for navigating permission issues when setting up npm link.

Once you have npm link set up to link your library and your app, by default it will link to the packaged version of your library.

Instead, we want to configure our library and app so that one branch links to our src entry point (for iterative development), another branch links links to the packaged 'dist' folder (for intermediate testing) and a final branch doesn't use npm link and instead imports from the published package on npm.

The instructions below outline how to set this up for the Svelte Component Library. For other libraries you can follow the same process and change references and links.

## Step-by-step guide

### Step 1

Open your **library's** `package.json` file and ensure that your exports are configured as follows:

```
"exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js",
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js"
    },
    "./src/*": "./src/lib/*",
    "./src/lib/*": "./src/lib/*"
},
```

### Step 2

In your **app**, create a new branch named `develop-lib-src`. In your `vite.config.js` file, write:

```
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import path from 'path';
import { fileURLToPath } from 'url';

// Emulate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libSrc = path.resolve(__dirname, '../../oflog_svelte_component_library/src/lib');

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
		  '@communitiesuk/svelte-component-library': libSrc
		}
	},
	server: {
		watch: {
		  include: [libSrc + '/**']
		},
		fs: {
			// Allow serving any static files (like fonts) from the component library
			allow: [
			  libSrc
			]
		  },
	},

	ssr: {
		noExternal: ['svelte-maplibre', '@communitiesuk/svelte-component-library']
	},
  	optimizeDeps: {
    	exclude: ['@communitiesuk/svelte-component-library']
  	},
  	build: {
    	commonjsOptions: {
      		include: [/node_modules/, /@communitiesuk\/svelte-component-library/]
    	}
  	}
});
```

Then update the relative path to your library's lib folder (line 12).

### Step 3

Next, test that `develop-lib-src` is linking to the src folder. Edit your root +page.svelte file to:

```
<script>
  import { Footer } from "@communitiesuk/svelte-component-library";
</script>

<Header></Header>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<Footer></Footer>
```

Run `npm run dev` to confirm that the link is working correctly. Next, make a temporary edit to your Footer component (e.g. just a bit of extra text) - and check that the edit is immediately reflected in your app.

### Step 4

Next, create a new branch based on `develop-lib-src` called `develop-lib-dist`.

Then amend the `vite.config.js` file to:

```
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import path from 'path';
import { fileURLToPath } from 'url';

// Emulate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libSrc = path.resolve(__dirname, '../../oflog_svelte_component_library');

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
			  libSrc
			]
		  },
	},
	ssr: {
		noExternal: ['svelte-maplibre',]
	},
  	build: {
    	commonjsOptions: {
      		include: [/node_modules/]
    	}
  	}
});
```

Next, run `npm run dev` to check that this branch is now importing components from the packaged version of the library (e.g. your temporary edit should not be present).

### Step 5

Our deployed app will use the actual published version of the library, rather than npm link. Therefore, before deploying we want to confirm that this is working as expected.

To do so, in our `main` branch we want our `vite.config.js` file to be:

```
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['svelte-maplibre',]
	},
  	build: {
    	commonjsOptions: {
      		include: [/node_modules/]
    	}
  	}
});
```

We then want to test by unlinking `npm unlink @communities/svelte-component-library` and re-install `npm install @communities/svelte-component-library`

When we switch back to our `develop` branches we will then need to re-link.

Note: The process of unlinking, installing, re-linking can be automated using .git/hooks (scripts which run when you checkout a branch) - we'll look to get this setup in the future.

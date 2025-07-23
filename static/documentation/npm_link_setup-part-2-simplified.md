# Setting up npm link part 2 - simplified approach with environment variables

[Npm_link_setup-part-1](./Npm_link_setup-part-1.md) provides instructions for navigating permission issues when setting up npm link.

Once you have npm link set up to link our library and your app, by default it will link to the packaged version of our library.

Instead of creating separate branches for different entry points, we can use environment variables to dynamically configure our app to use either the library's source files (for iterative development) or the built dist folder (for intermediate testing).

The instructions below outline how to set this up for the Svelte Component Library. For other libraries you can follow the same process and change references and links.

## Step-by-step guide

### Step 1: Configure our library's package.json

Open your **library's** `package.json` file and ensure that your exports are configured as follows:

```json
"exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js",
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js"
    },
    "./src/*": "./src/lib/*",
    "./src/lib/*": "./src/lib/*"
}
```

The `./src/*` and `./src/lib/*` entries allow your app to import files directly from our library's source when using a Vite alias.

### Step 2: Install required dependencies in your app

Add the following devDependencies to your app's `package.json`:

```bash
npm install --save-dev @types/node cross-env
```

### Step 3: Update your app's package.json scripts

Add the following scripts to your app's `package.json`:

```json
"scripts": {
  "dev": "vite dev",
  "dev-src": "cross-env LIB_SRC=1 vite dev",
  "build": "vite build",
  "preview": "vite preview"
}
```

- `dev`: Uses the built library (dist folder) or published npm package
- `dev-src`: Uses the library's source files for live development with hot reload

### Step 4: Configure your app's vite.config.js

Update your `vite.config.js` file with the following configuration:

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Emulate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use LIB_SRC_PATH env variable for local component library, fallback to default relative path
const libSrc = process.env.LIB_SRC_PATH || path.resolve(__dirname, '../oflog_svelte_component_library/src/lib');
const libDistAssets = path.resolve(__dirname, '../oflog_svelte_component_library/dist/assets');

export default defineConfig({
	plugins: [sveltekit()],
	// Alias to local component library if using dev-src
	resolve: {
		alias: process.env.LIB_SRC
			? {
				'@communitiesuk/svelte-component-library': libSrc
			}
			: {}
	},
	server: process.env.LIB_SRC
		? {
			fs: {
				allow: [libSrc, libDistAssets]
			},
			watch: {
				include: [libSrc + '/**']
			}
		}
		: {
			fs: {
				allow: [libDistAssets]
			}
		},
	ssr: {
		noExternal: ['svelte-maplibre', '@communitiesuk/svelte-component-library']
	},
	optimizeDeps: {
		exclude: ['@communitiesuk/svelte-component-library']
	},
	build: {
		commonjsOptions: {
			include: [
				/node_modules/,
				...(process.env.LIB_SRC ? [/oflog_svelte_component_library/] : [])
			]
		}
	}
});
```

Update the relative paths on lines with `libSrc` and `libDistAssets` to match the library's location on your PC (optional, as step 5 prefered method).

### Step 5: Set up environment variables

For team collaboration, create a `.env` file in your app's root directory:

```env
LIB_SRC_PATH=/absolute/path/to/your/oflog_svelte_component_library/src/lib
```

Replace the path with the actual location (absolute path) of the component library on your PC. Each team member can set their own path in their local `.env` file.

### Step 6: Test the setup

1. **Test source mode (live development):**
   ```bash
   npm run dev-src
   ```
   - Make a temporary edit to a component in your library's `src/lib` folder
   - The change should be immediately reflected in your app

2. **Test built mode (testing packaged version):**
   ```bash
   npm run dev
   ```
   - Your temporary edit should not be visible (uses built dist version)

3. **Test production mode:**
   ```bash
   npm unlink @communitiesuk/svelte-component-library
   npm install @communitiesuk/svelte-component-library
   npm run dev
   ```
   - Uses the published npm package instead of local files

## Usage Summary

| Command | What it uses | When to use |
|---------|-------------|-------------|
| `npm run dev-src` | Library source files (`src/lib`) | Live component development with hot reload |
| `npm run dev` | Built library (`dist`) or npm package | Testing packaged version, normal development |
| `npm run build` | Built library (`dist`) or npm package | Production builds |

## Team Collaboration

- Each team member sets `LIB_SRC_PATH` in their local `.env` file
- No need for separate branches or configurations
- Works cross-platform (Windows, macOS, Linux) thanks to `cross-env`

## Benefits of This Approach

- **Single branch:** No need to maintain separate configuration branches
- **Flexible:** Switch between source and built versions with different npm scripts
- **Team-friendly:** Each developer can set their own library path
- **Cross-platform:** Works on all operating systems
- **Simple:** Easy to understand and maintain

## Troubleshooting

- **Font loading issues:** The config includes `libDistAssets` in the Vite allow list to serve font files
- **Path issues:** Use absolute paths in `LIB_SRC_PATH` environment variable
- **Import errors:** Always import from the package root (`import { Component } from '@communitiesuk/svelte-component-library'`) rather than deep imports
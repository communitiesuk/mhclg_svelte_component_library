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
// @ts-nocheck
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
const env = loadEnv("", process.cwd(), "");

// Use environment variables for lib source path, infer assets path
const libSrc = env.LIB_SRC_PATH;
const libDistAssets = libSrc
  ? libSrc.replace("/src/lib", "/dist/assets")
  : undefined;

// Check if we should use local src
const useLocalSrc = !!libSrc;

// Simple confirmation log
console.log(
  `Using ${useLocalSrc ? "local source" : "npm package"} for component library`,
);
if (useLocalSrc) {
  console.log(`Source path: ${libSrc}`);
  console.log(`Assets path: ${libDistAssets}`);
} else if (!libSrc) {
  console.log(`⚠️ Missing LIB_SRC_PATH - add it to .env file`);
}

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  // Alias to local component library if using local src
  resolve: {
    alias: useLocalSrc
      ? {
          "@communitiesuk/svelte-component-library": libSrc,
        }
      : {},
  },
  // Only allow and watch src if both paths are set
  server: useLocalSrc
    ? {
        fs: {
          allow: [libSrc, libDistAssets].filter(Boolean),
        },
        watch: {
          include: [libSrc + "/**"],
        },
      }
    : {},
  ssr: {
    noExternal: ["svelte-maplibre", "@communitiesuk/svelte-component-library"],
  },
  optimizeDeps: {
    exclude: ["@communitiesuk/svelte-component-library"],
  },
  build: {
    commonjsOptions: {
      include: [
        /node_modules/,
        ...(useLocalSrc ? [/oflog_svelte_component_library/] : []),
      ],
    },
  },
});
```

**Key improvements in this configuration:**

- Uses `loadEnv()` to properly load `LIB_SRC_PATH` from `.env` file
- Automatically determines whether to use source or built mode based on presence of `LIB_SRC_PATH`
- Automatically infers the assets path from the source path
- Includes helpful console logging to confirm which mode is being used
- Better error handling with path filtering using `.filter(Boolean)`
- Cleaner logic with the `useLocalSrc` boolean variable

**How it works:**

- If `LIB_SRC_PATH` is set in `.env`: Uses library source files for live development
- If `LIB_SRC_PATH` is not set: Uses built library or npm package

### Step 5: Set up environment variables

For team collaboration, create a `.env` file in your app's root directory:

```env
LIB_SRC_PATH=/absolute/path/to/your/oflog_svelte_component_library/src/lib
```

Replace the path with the actual location (absolute path) of the component library on your PC. Each team member can set their own path in their local `.env` file.

### Step 6: Test the setup

1. **Test source mode (live development):**

   - Ensure `LIB_SRC_PATH` is set in your `.env` file

   ```bash
   npm run dev-src
   ```

   - You should see console output: "Using local source for component library"
   - Make a temporary edit to a component in your library's `src/lib` folder
   - The change should be immediately reflected in your app

2. **Test built mode (testing packaged version):**

   ```bash
   npm run dev
   ```

   - You should see console output: "Using npm package for component library"
   - Your temporary edit should not be visible (uses built dist version)
   - Need to do npm run build in component library and re-link to see changes in package consuming app

3. **Test production mode:**
   ```bash
   npm unlink @communitiesuk/svelte-component-library
   npm install @communitiesuk/svelte-component-library
   npm run dev
   ```
   - Uses the published npm package instead of local files

## Usage Summary

| Command           | What it uses                          | When to use                                  |
| ----------------- | ------------------------------------- | -------------------------------------------- |
| `npm run dev-src` | Library source files (`src/lib`)      | Live component development with hot reload   |
| `npm run dev`     | Built library (`dist`) or npm package | Testing packaged version, normal development |
| `npm run build`   | Built library (`dist`) or npm package | Production builds                            |

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
- **Robust:** Better error handling and path resolution using Vite's built-in functions

## Troubleshooting

- **Font loading issues:** The config includes `libDistAssets` in the Vite allow list to serve font files
- **Path issues:** Use absolute paths in `LIB_SRC_PATH` environment variable
- **Import errors:** Always import from the package root (`import { Component } from '@communitiesuk/svelte-component-library'`) rather than deep imports
- **Node module export errors:** If you encounter errors related to Node module exports when linking the component library repo (the one you are linking from) and run the following commands in its directory:

  ```bash
  npm uninstall node
  npm uninstall npm
  ```

  This can resolve issues caused by accidentally installed `node` or `npm` as dependencies in the library, which can break module resolution when linking.

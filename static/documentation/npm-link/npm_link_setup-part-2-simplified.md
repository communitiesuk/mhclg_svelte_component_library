# Setting up npm link part 2 - simplified approach with environment variables

[Npm_link_setup-part-1](./Npm_link_setup-part-1.md) provides instructions for navigating permission issues when setting up npm link.

## Executive Summary

Once you have set up `npm link` to connect the **library** (the component library you are developing) and your **app** (the project consuming the library), by default your app will use the packaged (built) version of the library. This means your app imports the compiled files from the library's `dist` folder, not the raw source files. The steps below show how to switch between using the library's source files and the built package for development.

Instead of creating separate branches for different entry points, we can use environment variables to dynamically configure our app to use either the library's source files (for iterative development) or the built dist folder (for intermediate testing).

The instructions below outline how to set this up for the Svelte Component Library. For other libraries you can follow the same process and change references and links.

## How npm link works

Before diving into the configuration, it's helpful to understand what npm link actually does behind the scenes:

### The mechanism

**npm link** creates symbolic links (symlinks) in your file system to connect a local package to a consuming project without publishing to npm. Here's how it works:

1. **Step 1 - Register the library:** When you run `npm link` in your library directory, npm creates a global symlink from your library to the global npm modules folder

   - On macOS/Linux: Usually `~/.npm-global/lib/node_modules/` or `/usr/local/lib/node_modules/`
   - On Windows: Usually `%APPDATA%/npm/node_modules/`

2. **Step 2 - Link in consuming app:** When you run `npm link @communitiesuk/svelte-component-library` in your app directory, npm creates a symlink in your app's `node_modules` folder that points to the global symlink created in step 1

### What this means for development

- **Real-time file availability (symlink):** When you link a library with `npm link`, your app's `node_modules/@communitiesuk/svelte-component-library` becomes a symlink to the library folder. That makes the library's files immediately visible on disk to the app and to tools that import them. In short: edits you make in the library appear immediately in the file tree the app uses.

- **Hot Module Replacement (HMR):** HMR is a feature of dev servers like Vite that updates modules in the running app without a full page reload. HMR only works if the dev server is actually loading the changed source files and is configured to watch them. Simply having a symlink does not automatically enable HMR for library source files — you must import the source files (not the built `dist`) and configure Vite to watch/allow those paths.

- **Built vs source files:** By default most packages expose a built entry (e.g. `dist/index.js`). If your app imports the package root and that root points at `dist`, then edits to the library `src` files will not affect the app until you rebuild the library using `npm build` (because the app is reading the compiled files, not the source).

- **No reinstallation needed:** You don't need to run `npm install` again after linking or changing files — the symlink makes the library available immediately. However, whether changes are reflected in the running app depends on which files the dev server is using and watching.

### The challenge this document solves

- If you only use `npm link` but still import the package's built `dist` entry, you must rebuild the library to see changes in the app. That gives you "real-time availability" of files on disk but not the developer experience of HMR.

- To get true hot-reload for library components you must: use an alias so the app imports the library's source (`src/lib`) directly, and configure Vite to allow and watch the library source paths (fs.allow, watch.include). When configured this way, edits to the library source will trigger Vite HMR and update the app instantly without rebuilding.

- This document shows how to switch between those two modes (built vs source) using environment variables and a small Vite configuration change, so you can choose fast HMR during development or the built package for testing.

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

In your **consuming app**, install the following development dependencies:

```bash
npm install --save-dev @types/node cross-env
```

These packages are needed for environment variable support (`cross-env`) and TypeScript compatibility (`@types/node`).  
Make sure you run this command in your consuming app, **not** in the Svelte Component Library.

Add the following devDependencies to your app's `package.json`:

```bash
npm install --save-dev @types/node cross-env
```

### Step 3: Update your app's package.json scripts

Add the following scripts to your app's `package.json`:

> **Note:**  
> Perform this setup once when initially configuring your project.  
> Commit these changes to your main branch so that all future branches inherit the configuration automatically.

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

### Step 4: Configure your app's vite.config.ts

Replace everything in your vite.config.ts with the following code:

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

// Check if we should use local src based on LIB_SRC cmd line environment variable
const useLocalSrc = !!process.env.LIB_SRC;

// Always compute component library paths (needed for npm link and local src)
const componentLibPath = env.LIB_SRC_PATH;
const componentLibRoot = componentLibPath.replace("/src/lib", "");

// Set the lib source path when using local src - get from .env file
const libSrc = useLocalSrc ? componentLibPath : null;
const libSrcAssets = componentLibPath + "/assets";
const libDistAssets = componentLibRoot + "/dist/assets";

// Simple confirmation log
console.log(
  `Using ${useLocalSrc ? "local source" : "npm package"} for component library`,
);
if (useLocalSrc) {
  console.log(`Source path: ${libSrc}`);
  console.log(`Source assets path: ${libSrcAssets}`);
  console.log(`Dist assets path: ${libDistAssets}`);
  if (!libSrc) {
    console.log(`⚠️ Missing LIB_SRC_PATH - add it to .env file`);
  } else if (!componentLibPath.includes("src/lib")) {
    console.log(
      `⚠️ LIB_SRC_PATH should include 'src/lib' - current path: ${componentLibPath}`,
    );
  }
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
  // Server configuration - allow linked component library assets
  server: {
    fs: {
      allow: [libSrcAssets, libDistAssets].filter(Boolean),
    },
    ...(useLocalSrc
      ? {
          watch: {
            include: [libSrc + "/**"],
          },
        }
      : {}),
  },
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
  test: {
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          name: "client",
          environment: "browser",
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"],
          setupFiles: ["./vitest-setup-client.ts"],
        },
      },
      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
});
```

**Key improvements in this configuration:**

- Uses `loadEnv()` to properly load `LIB_SRC_PATH` from `.env` file
- Automatically determines whether to use source or built mode based on presence of `LIB_SRC` cmd line env variable
- Automatically infers the assets path from the source path
- Includes helpful console logging to confirm which mode is being used
- Better error handling with path filtering using `.filter(Boolean)`
- Cleaner logic with the `useLocalSrc` boolean variable

### Step 5: Set up environment variables

For team collaboration, create a `.env` file in your app's root directory:

```env
LIB_SRC_PATH=/absolute/path/to/your/oflog_svelte_component_library/src/lib
```

Replace the path with the actual location (absolute path) of the component library on your PC. Each team member must set their own path in their local `.env` file.

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

- **Font loading issues:** The config includes `libDistAssets` and `libSrcAssets` in the Vite allow list to serve font files
- **Path issues:** Use absolute paths in `LIB_SRC_PATH` environment variable without quotation marks
- **Import errors:** Always import from the package root (`import { Component } from '@communitiesuk/svelte-component-library'`) rather than deep imports
- **Node module export errors:** If you encounter errors related to Node module exports when linking the component library repo (the one you are linking from), check if `node` or `npm` are listed as dependencies in your library's `package.json`. These should **not** be dependencies. If they are present, remove them by running:

  ```bash
  npm uninstall node
  npm uninstall npm
  ```

  > **Why this matters:**  
  > `node` and `npm` are runtime tools, not libraries to be imported by your code. Including them as dependencies causes npm to install them inside your `node_modules` folder, which can confuse Node's module resolution algorithm.  
  > 
  > **Module resolution** is the process Node uses to find and load modules when you use `require()` or `import`. If `node` or `npm` are present in your `node_modules`, Node may try to load them as packages instead of using the system binaries, leading to unexpected errors—especially when using `npm link`, which relies on correct resolution of your library's exports.  
  > 
  > **In summary:** Never add `node` or `npm` as dependencies in your library. Their presence can break module resolution, cause export errors, and prevent your linked library from working as expected.

  After uninstalling, try linking again.

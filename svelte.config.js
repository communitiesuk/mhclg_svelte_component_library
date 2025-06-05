import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
// import { mdsvex } from 'mdsvex';
import { join } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // ignore deliberate link to shiny 404 page
        if (true) {
          return;
        }

        // otherwise fail the build
        throw new Error(message);
      },
    },
    files: {
      assets: "static",
    },
    alias: {
      "govuk-frontend": join(process.cwd(), "node_modules/govuk-frontend"),
    },
    paths: {
      base:
        process.env.NODE_ENV === "production" ? "/sveltekit-github-pages" : "",
    },
  },

  extensions: [".svelte", ".svx"],
};

export default config;

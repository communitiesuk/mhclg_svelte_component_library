import adapter from "@sveltejs/adapter-static";
import { join } from "path";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations#preprocessors
  // for more information about preprocessors

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // ignore deliberate link to shiny 404 page
        if (true) {
          console.log(path, referrer, message);
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
      base: dev ? "" : "/mhclg_svelte_component_library",
    },
  },
  trailingSlash: "always",
  extensions: [".svelte", ".svx"],
};

export default config;

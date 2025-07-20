import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
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
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "docs",
      assets: "docs",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        console.log(path);
        return;
      },
      entries: [
        "/404.html/",
        "/get-started/component-statuses",
        "/components-update/data-vis/axis/axis",
        "/components-update/data-vis/axis/ticks",
        "/components-update/content/inset-text",
        "/components-update/content/warning-text",
        "/components-update/data-vis/line-chart/line-chart",
        "/components-update/data-vis/line-chart/line",
        "/components-update/data-vis/map/map",
        "/components-update/data-vis/table/table",
        "/components-update/layout/breadcrumbs",
        "/components-update/layout/footer",
        "/components-update/layout/header",
        "/components-update/layout/internal-header",
        "/components-update/layout/phase-banner",
        "/components-update/layout/service-navigation",
        "/components-update/layout/side-navigation",
        "/components-update/layout/header-nav",
        "/components-update/layout/mobile-nav",
        "/components-update/layout/service-navigation-nested-mobile",
        "/components-update/layout/side-nav",
        "/components-update/ui/accordion",
        "/components-update/ui/button",
        "/components-update/ui/contents-list",
        "/components-update/ui/date-input",
        "/components-update/ui/details",
        "/components-update/ui/filter-panel",
        "/components-update/ui/masthead",
        "/components-update/ui/notification-banner",
        "/components-update/ui/radios",
        "/components-update/ui/related-banner",
        "/components-update/ui/search-autocomplete",
        "/components-update/ui/search",
        "/components-update/ui/select",
        "/components-update/ui/tabs",
        "/components-update/ui/whats-new",
      ],
    },
    paths: {
      base:
        process.env.NODE_ENV === "production"
          ? "/mhclg_svelte_component_library"
          : "",
    },
    files: {
      assets: "static",
    },
    alias: {
      "govuk-frontend": join(process.cwd(), "node_modules/govuk-frontend"),
    },
  },

  extensions: [".svelte", ".svx"],
};

export default config;

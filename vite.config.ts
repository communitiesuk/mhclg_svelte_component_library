import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: "inject-filepath",
      transform(code, id) {
        if (id.endsWith(".svelte")) {
          return code.replace("__FILE_PATH__", JSON.stringify(id));
        }
        return code;
      },
    },
    viteStaticCopy({
      targets: [
        {
          src: "static/assets/fonts",
          dest: "assets", // dist/assets/fonts
        },
        {
          src: "static/assets/images",
          dest: "assets",// dist/assets/images
        },
        {
          src: "static/assets/govuk_publishing_components",
          dest: "assets", // dist/assets/govuk_publishing_components
        },
      ],
    }),
  ],
  server: {
    fs: {
      allow: ["node_modules/govuk-frontend"],
    },
  },
  resolve: {
    alias: {
      $routes: "/src/routes",
    },
  },
});

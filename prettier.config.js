/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-svelte"],
  svelteStrictMode: false,
  svelteBracketNewLine: true,
  svelteAllowShorthand: true,
  svelteIndentScriptAndStyle: true,
};

export default config;
